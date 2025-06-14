using eRecruitment.Data;
using eRecruitment.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.RegularExpressions;
using UglyToad.PdfPig;

namespace eRecruitment.Service
{
    public interface ICVBankService
    {
        Task<CVBank> ProcessAndSaveCVAsync(IFormFile file, int requisitionID);
        List<CVBank> GetCVsByRequisition(int requisitionID);
        bool DeleteCV(int id);
    }

    public class CVBankService : ICVBankService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;

        public CVBankService(ApplicationDbContext context, IConfiguration config, IHttpClientFactory httpFactory)
        {
            _context = context;
            _config = config;
            _httpClient = httpFactory.CreateClient();
        }

        public List<CVBank> GetCVsByRequisition(int requisitionID)
        {
            return _context.CVs.Where(cv => cv.RequisitionID == requisitionID).ToList();
        }

        public bool DeleteCV(int id)
        {
            var cv = _context.CVs.FirstOrDefault(c => c.CVId == id);
            if (cv == null) return false;

            _context.CVs.Remove(cv);
            _context.SaveChanges();
            return true;
        }

        public async Task<CVBank> ProcessAndSaveCVAsync(IFormFile file, int requisitionID)
        {
            byte[] fileBytes;
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                fileBytes = ms.ToArray();
            }

            string extractedText = ExtractTextFromPdf(fileBytes);
            string resultJson = await ParseCVUsingOpenAIAsync(extractedText);

            string name = ExtractNameFromFile(file.FileName);
            string email = ExtractEmail(resultJson);
            string phone = ExtractPhone(resultJson);
            string education = ExtractEducation(resultJson);
            string skill = ExtractSkills(resultJson);
            string experience = ExtractExperience(resultJson);
            string gender = ExtractGender(resultJson);

            var existCvName = _context.CVs.Any(cv => cv.RequisitionID == requisitionID && cv.Name == name);
            var existCvEmail = _context.CVs.Any(cv => cv.RequisitionID == requisitionID && cv.Email == email);
            var existCvPhone = _context.CVs.Any(cv => cv.RequisitionID == requisitionID && cv.Phone == phone);

            if (existCvName || existCvEmail || existCvPhone)
                throw new Exception("Duplicate CV detected by Name, Email or Phone.");

            var newCV = new CVBank
            {
                RequisitionID = requisitionID,
                Name = name,
                Email = email,
                Phone = phone,
                Education = education,
                Skill = skill,
                Experience = experience,
                Gender = gender,
                Cv = fileBytes
            };

            _context.CVs.Add(newCV);
            _context.SaveChanges();

            return newCV;
        }

        private async Task<string> ParseCVUsingOpenAIAsync(string cvText)
        {
            var apiKey = _config["OpenAI:ApiKey"];
            var model = _config["OpenAI:Model"];

            using var client = new HttpClient();
            client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);

            var request = new
            {
                model,
                messages = new[]
                {
                new { role = "system", content = "You are a helpful assistant that extracts structured information from CVs." },
                new { role = "user", content = $"Extract the following from this CV:\n- Full Name\n- Email\n- Phone\n- Gender\n- Skills\n- Education\n- Work Experience\n- Years of Work Experience\n\nCV Text:\n{cvText}" }
            }
            };

            var json = System.Text.Json.JsonSerializer.Serialize(request);
            var response = await client.PostAsync("https://api.openai.com/v1/chat/completions", new StringContent(json, Encoding.UTF8, "application/json"));

            if (!response.IsSuccessStatusCode)
            {
                var error = await response.Content.ReadAsStringAsync();
                throw new Exception($"OpenAI API error: {response.StatusCode} - {error}");
            }

            var result = await response.Content.ReadAsStringAsync();
            var jsonDoc = System.Text.Json.JsonDocument.Parse(result);
            return jsonDoc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
        }

        #region Extraction from response json

        private string ExtractTextFromPdf(byte[] pdfBytes)
        {
            using (var ms = new MemoryStream(pdfBytes))
            using (var pdfDocument = PdfDocument.Open(ms))
            {
                return string.Join(" ", pdfDocument.GetPages().Select(p => p.Text));
            }
        }

        private string ExtractName(string text)
        {
            var nameMatch = Regex.Match(text, @"(?i)(?:Name|Full Name|Candidate):\s*(\w+\s\w+)");
            return nameMatch.Success ? nameMatch.Groups[1].Value : "Unknown";
        }

        private string ExtractNameFromFile(string fileName)
        {
            fileName = Path.GetFileNameWithoutExtension(fileName);

            string[] ignoreWords = { "cv", "resume", "application" };
            fileName = string.Join(" ", fileName.Split('_', '-', ' ')
                .Where(word => !ignoreWords.Contains(word.ToLower())));

            var nameMatch = Regex.Match(fileName, @"([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)");
            return nameMatch.Success ? nameMatch.Groups[1].Value : "Unknown";
        }

        private string ExtractEmail(string text)
        {
            var emailMatch = Regex.Match(text, @"[\w\.-]+@[\w\.-]+\.\w+");
            return emailMatch.Success ? emailMatch.Value : "Not Found";
        }

        private string ExtractPhone(string text)
        {
            var phoneMatch = Regex.Match(text, @"(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}");
            return phoneMatch.Success ? phoneMatch.Value : "Not Found";
        }

        private string ExtractEducation(string text)
        {
            //text = text.ToLower();
            //string[] degrees = { "doctorate", "phd", "msc", "mba", "master", "bachelor", "bba", "bsc", "diploma", "ssc", "hsc"};
            //foreach (var degree in degrees)
            //{
            //    if (text.Contains(degree))
            //    {
            //        var degreeUpper = degree.ToUpper();
            //        return degreeUpper;
            //    }
            //}
            //return "Not Found";

            //new
            var match = Regex.Match(text, @"\*\*Education:\*\*\s*-\s*(.+?)\n", RegexOptions.Singleline);
            return match.Success ? match.Groups[1].Value.Trim() : "Not Found";
        }

        private string ExtractSkills(string text)
        {
            var match = Regex.Match(text, @"\*\*Skills:\*\*\s*(.+?)\s*- \*\*Education:\*\*", RegexOptions.Singleline);
            if (match.Success)
            {
                string skillsBlock = match.Groups[1].Value;

                skillsBlock = Regex.Replace(skillsBlock, @"\*+", "");
                skillsBlock = Regex.Replace(skillsBlock, @"[A-Za-z\s]+?:", "");

                var skills = skillsBlock.Split(',')
                                        .Select(skill => skill.Trim())
                                        .Where(skill => !string.IsNullOrWhiteSpace(skill));

                return string.Join(", ", skills);
            }

            return "Not Found";
        }
        private string ExtractExperience(string text)
        {
            //text = text.ToLower();
            //var match = Regex.Match(text, @"(?i)(?:experience|work wxperience|working experience|professional experience)[:\s-]+([\s\S]+?)(?:\n\n|\n[A-Z])");
            var match = Regex.Match(text, @"\*\*Years of Work Experience:\*\*\s*(.*?)\Z", RegexOptions.Singleline);

            return match.Success ? match.Groups[1].Value.Trim() : "Not Found";
        }

        private string ExtractGender(string text)
        {
            var match = Regex.Match(text, @"\*\*Gender:\*\*\s*(Male|Female)", RegexOptions.IgnoreCase);
            return match.Success ? match.Groups[1].Value : "Not Found";
        }
        #endregion
    }
}
