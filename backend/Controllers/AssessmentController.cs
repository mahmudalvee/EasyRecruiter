using Microsoft.AspNetCore.Mvc;
using eRecruitment.Data;
using eRecruitment.Models;
using System.Linq;
using eRecruitment.Service;

namespace eRecruitment.Controllers
{
    [Route("api/assessment")]
    [ApiController]
    public class AssessmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAssessmentService _assessmentService;

        public AssessmentController(ApplicationDbContext context, IAssessmentService assessmentService)
        {
            _context = context;
            _assessmentService = assessmentService;
        }

        [HttpGet("{requisitionID}")]
        public IActionResult GetAssessments(int requisitionID)
        {
            List<Assessment> assessments = new List<Assessment>();
            try
            {
                assessments = _assessmentService.Get(requisitionID);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            return Ok(assessments);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddAssessment([FromBody] Assessment assessment)
        {
            var message = await _assessmentService.Add(assessment);

            if (message == "Invalid data")
                return BadRequest(new { message });

            return Ok(new { message, assessment });
        }

        [HttpPost("addMultiple")]
        public async Task<IActionResult> AddMultipleAssessments([FromBody] List<Assessment> assessments)
        {
            var message = await _assessmentService.AddMultiple(assessments);

            if (message == "No assessments provided")
                return BadRequest(new { message });

            return Ok(new { message });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAssessment(int id)
        {
            var message = await _assessmentService.Delete(id);

            if (message == "Assessment not found")
                return NotFound(new { message });

            return Ok(new { message });
        }

    }
}
