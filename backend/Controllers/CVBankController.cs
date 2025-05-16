using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using eRecruitment.Data;
using UglyToad.PdfPig;
using eRecruitment.Models;
using System.Text.RegularExpressions;              // or whatever PDF library you use

[ApiController]
[Route("api/[controller]")]
public class CVBankController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;
    private readonly HttpClient _httpClient;

    public CVBankController(
        ApplicationDbContext context,
        IConfiguration config,
        IHttpClientFactory httpFactory)
    {
        _context = context;
        _config = config;
        _httpClient = httpFactory.CreateClient();
    }

    [HttpGet("{requisitionID}")]
        public IActionResult GetCVsByRequisition(int requisitionID)
        {
            try
            {
                var cvs = _context.CVs.Where(cv => cv.RequisitionID == requisitionID).ToList();

                if (!cvs.Any())
                {
                    return NotFound(new { message = "No CVs found for this requisition" });
                }

                return Ok(cvs);
            }
            catch(Exception e)
            {
                return NotFound(new { message = "Error Occured" });
            }
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadCV([FromForm] IFormFile file, [FromForm] int requisitionID)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file uploaded" });
            }

            try
            {
                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    await file.CopyToAsync(ms);
                    fileBytes = ms.ToArray();
                }

                string extractedText = ExtractTextFromPdf(fileBytes);

                string resultJson = await ParseCVUsingOpenAIAsync(extractedText);


                //string name = ExtractName(extractedText);
                string name = ExtractNameFromFile(file.FileName);
                string email = ExtractEmail(extractedText);
                string phone = ExtractPhone(extractedText);
                string education = ExtractEducation(extractedText);
                string skill = ExtractSkills(extractedText);
                string experience = ExtractExperience(extractedText);
                string gender = ExtractGender(extractedText);

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
                    Cv = fileBytes // Store PDF
                };

                var existCvName = _context.CVs.Where(cv => cv.RequisitionID == requisitionID && cv.Name == newCV.Name).ToList();
                var existCvEmail = _context.CVs.Where(cv => cv.RequisitionID == requisitionID && cv.Email == newCV.Email).ToList();
                var existCvPhone = _context.CVs.Where(cv => cv.RequisitionID == requisitionID && cv.Phone == newCV.Phone).ToList();
                if (existCvName.Any())
                    return StatusCode(500, new { message = "CV Bank already exists with same Name: " + newCV.Name});
                if (existCvEmail.Any())
                    return StatusCode(500, new { message = "CV Bank already exists with same e-mail: " + newCV.Email });
                if (existCvPhone.Any())
                    return StatusCode(500, new { message = "CV Bank already exists with same Phone: " + newCV.Phone });


                _context.CVs.Add(newCV);
                _context.SaveChanges();

                return Ok(new { message = "CV uploaded and processed successfully", name, email, phone, education });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error processing CV", error = ex.Message });
            }
        }

    private async Task<string> ParseCVUsingOpenAIAsync(string cvText)
    {
        var apiKey = _config["OpenAI:ApiKey"];
        var model = _config["OpenAI:Model"];   // "gpt-4o-mini"

        using var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", apiKey);

        var request = new
        {
            model = model,
            messages = new[]
            {
            new { role = "system", content = "You are a helpful assistant that extracts structured information from CVs." },
            new { role = "user", content = $"Extract the following from this CV:\n- Full Name\n- Email\n- Phone\n- Skills\n- Education\n- Work Experience\n\nCV Text:\n{cvText}" }
        }
        };

        var json = System.Text.Json.JsonSerializer.Serialize(request);

        var response = await client.PostAsync("https://api.openai.com/v1/chat/completions",
            new StringContent(json, Encoding.UTF8, "application/json"));

        if (!response.IsSuccessStatusCode)
        {
            var error = await response.Content.ReadAsStringAsync();
            throw new Exception($"OpenAI API error: {response.StatusCode} - {error}");
        }

        var result = await response.Content.ReadAsStringAsync();
        var jsonDoc = System.Text.Json.JsonDocument.Parse(result);
        return jsonDoc.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();
    }


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
            text = text.ToLower();
            string[] degrees = { "doctorate", "phd", "msc", "mba", "master", "bachelor", "bba", "bsc", "diploma", "ssc", "hsc"};
            foreach (var degree in degrees)
            {
                if (text.Contains(degree))
                {
                    var degreeUpper = degree.ToUpper();
                    return degreeUpper;
                }
            }
            return "Not Found";
        }

        private string ExtractSkills(string text)
        {
            var match = Regex.Match(text, @"(?i)(?:Skills|Technical Skills|Expertise|Language)[:\s-]+([\s\S]+?)(?:\n\n|\n[A-Z])");
            return match.Success ? match.Groups[1].Value.Trim() : "Not Found";
        }
        private string ExtractExperience(string text)
        {
            text = text.ToLower();
            var match = Regex.Match(text, @"(?i)(?:experience|work wxperience|working experience|professional experience)[:\s-]+([\s\S]+?)(?:\n\n|\n[A-Z])");
            return match.Success ? match.Groups[1].Value.Trim() : "Not Found";
        }

        private string ExtractGender(string text)
        {
            var match = Regex.Match(text, @"(?i)(?:Gender|Sex)[:\s-]+(Male|Female|Other|Non-Binary|M|F)");
            return match.Success ? match.Groups[1].Value : "Not Found";
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteCV(int id)
        {
            var cv = _context.CVs.FirstOrDefault(c => c.CVId == id);
            if (cv == null)
            {
                return NotFound(new { message = "CV not found" });
            }

            _context.CVs.Remove(cv);
            _context.SaveChanges();

            return Ok(new { message = "CV deleted successfully" });
        }



}