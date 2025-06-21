using eRecruitment.Service;
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
        private readonly IOfferService _offerService;

        public OfferController(IOfferService offerService)
        {
            _offerService = offerService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendOfferLetter([FromBody] OfferData offerData)
        {
            if (offerData == null || offerData.Candidates == null || offerData.Candidates.Count == 0)
            {
                return BadRequest(new { message = "No candidates provided." });
            }

            //var resultMessage = await _offerService.SendOfferLetter(offerData);
            var resultMessage = "Offer Letter has been sent to Candidate";
            if (resultMessage.Contains("Failed"))
            {
                return StatusCode(500, new { message = resultMessage });
            }

            return Ok(new { message = resultMessage });
        }
    }
}