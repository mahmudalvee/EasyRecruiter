using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace eRecruitment.Controllers
{
    [Route("api/offer")]
    [ApiController]
    public class OfferController : ControllerBase
    {
        // POST: api/offer/send
        [HttpPost("send")]
        public async Task<IActionResult> SendOfferLetter([FromBody] OfferData offerData)
        {
            if (offerData == null || offerData.Candidates == null || offerData.Candidates.Count == 0)
            {
                return BadRequest(new { message = "No candidates selected." });
            }

            // SMTP Configuration (replace with your SMTP settings)
            var smtpClient = new SmtpClient("smtp.gmail.com") // For Gmail
            {
                Port = 587,  // Use 587 for TLS/STARTTLS
                Credentials = new NetworkCredential("your-email@gmail.com", "your-email-password"),  // Replace with your email and password
                EnableSsl = true
            };

            foreach (var candidate in offerData.Candidates)
            {
                var subject = offerData.SubjectLine;
                var body = GenerateEmailBody(offerData, candidate);

                try
                {
                    // Send email using SMTP client
                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress("alvee@celimited.com"),  // Replace with your email address
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = false,  // Set to true if you want HTML email
                    };

                    mailMessage.To.Add(candidate.Email);

                    // Send the email
                    await smtpClient.SendMailAsync(mailMessage);

                    // You can log the success of the email sending process here if needed
                }
                catch (Exception ex)
                {
                    // Handle the exception if the email fails to send
                    return StatusCode(500, new { message = $"Failed to send email to {candidate.Email}. Error: {ex.Message}" });
                }
            }

            return Ok(new { message = "Offer letters sent successfully." });
        }

        // Helper method to generate email body
        private string GenerateEmailBody(OfferData offerData, Candidate candidate)
        {
            return $"Dear {candidate.Name},\n\n" +
                   $"We are pleased to offer you the position of {offerData.Designation} at {offerData.Department}. " +
                   $"Your joining date is {offerData.JoiningDate}.\n\n" +
                   $"Salary: {offerData.Salary}\n\n" +
                   $"Best regards,\n" +
                   $"Your Company";
        }
    }

    // Model to represent the offer data and the list of selected candidates
    public class OfferData
    {
        public string? JoiningDate { get; set; }
        public decimal Salary { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public string? SubjectLine { get; set; }
        public List<Candidate>? Candidates { get; set; }
    }

    // Model to represent a candidate
    public class Candidate
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}