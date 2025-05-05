using Microsoft.AspNetCore.Mvc;
using eRecruitment.Data;
using eRecruitment.Models;
using System.Linq;

namespace eRecruitment.Controllers
{
    [Route("api/assessment")]
    [ApiController]
    public class AssessmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AssessmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{requisitionID}")]
        public IActionResult GetAssessments(int requisitionID)
        {
            var assessments = _context.Assessments.Where(a => a.RequisitionID == requisitionID).ToList();


            return Ok(assessments);
        }

        [HttpPost("add")]
        public IActionResult AddAssessment([FromBody] Assessment assessment)
        {
            if (assessment == null)
            {
                return BadRequest(new { message = "Invalid data" });
            }

            assessment.TotalMarks = assessment.WrittenMarks + assessment.VivaMarks + assessment.OtherMarks; // Auto-calculate Total

            _context.Assessments.Add(assessment);
            _context.SaveChanges();

            return Ok(new { message = "Assessment added successfully", assessment });
        }

        [HttpPost("addMultiple")]
        public IActionResult AddMultipleAssessments([FromBody] List<Assessment> assessments)
        {
            if (assessments == null || !assessments.Any())
            {
                return BadRequest(new { message = "No assessments provided" });
            }

            foreach (var assessment in assessments)
            {
                var existingAssessment = _context.Assessments
                    .FirstOrDefault(a => a.CVId == assessment.CVId && a.RequisitionID == assessment.RequisitionID);

                if (existingAssessment != null)
                {
                    // Update existing assessment
                    existingAssessment.WrittenMarks = assessment.WrittenMarks;
                    existingAssessment.VivaMarks = assessment.VivaMarks;
                    existingAssessment.OtherMarks = assessment.OtherMarks;
                    existingAssessment.TotalMarks = assessment.WrittenMarks + assessment.VivaMarks + assessment.OtherMarks;
                    existingAssessment.Comment = assessment.Comment;
                    existingAssessment.IsSelected = assessment.IsSelected;
                }
                else
                {
                    // Add new assessment
                    _context.Assessments.Add(assessment);
                }
            }

            _context.SaveChanges();
            return Ok(new { message = "Assessments added/updated successfully" });
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteAssessment(int id)
        {
            var assessment = _context.Assessments.FirstOrDefault(a => a.AssessmentId == id);
            if (assessment == null)
            {
                return NotFound(new { message = "Assessment not found" });
            }

            _context.Assessments.Remove(assessment);
            _context.SaveChanges();

            return Ok(new { message = "Assessment deleted successfully" });
        }

    }
}
