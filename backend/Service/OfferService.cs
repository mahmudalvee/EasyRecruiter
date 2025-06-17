using eRecruitment.Data;
using eRecruitment.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;

namespace eRecruitment.Service
{
    public interface IOfferService
    {
        Task<string> SendOfferLetter(OfferData data);
    }

    public class OfferData
    {
        public string? JoiningDate { get; set; }
        public decimal Salary { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public string? SubjectLine { get; set; }
        public List<Candidate>? Candidates { get; set; }
    }

    public class Candidate
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public class OfferService : IOfferService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public OfferService(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<string> SendOfferLetter(OfferData offerData)
        {
            if (offerData == null || offerData.Candidates == null || offerData.Candidates.Count == 0)
            {
                return "Failed to send email: No candidates selected.";
            }

            var emailAddress = _config["Mail:emailAddress"];
            var password = _config["Mail:password"];
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(emailAddress, password),
                EnableSsl = true
            };

            foreach (var candidate in offerData.Candidates)
            {
                var subject = offerData.SubjectLine;
                var body = GenerateEmailBody(offerData, candidate);

                try
                {
                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("your-email@gmail.com"),
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = false,
                    };

                    mailMessage.To.Add(candidate.Email);
                    await smtpClient.SendMailAsync(mailMessage);
                }
                catch (Exception e)
                {
                    return $"Failed to send email to {candidate.Email}. Error: {e.Message}";
                }
            }

            return "Offer letters sent successfully.";
        }

        private string GenerateEmailBody(OfferData offerData, Candidate candidate)
        {
            return $"Dear {candidate.Name},\n\n" +
                   $"Congratulations! We are pleased to offer you the position of {offerData.Designation} at {offerData.Department}. " +
                   $"Your joining date is {offerData.JoiningDate}.\n\n" +
                   $"Salary: {offerData.Salary}\n\n" +
                   $"Best regards,\n" +
                   $"Team Easy Recruiter";
        }
    }
}