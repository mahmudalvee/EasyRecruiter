using Microsoft.AspNetCore.Mvc;
using eRecruitment.Models;
using eRecruitment.Service;

namespace eRecruitment.Controllers
{
    [Route("api/requisition")]
    [ApiController]
    public class RecruitmentController : ControllerBase
    {
        private readonly IRequisitionService _requisitionService;

        public RecruitmentController(IRequisitionService requisitionService)
        {
            _requisitionService = requisitionService;
        }

        [HttpPost("addRecruitment")]
        public IActionResult AddRequisition([FromBody] Requisition requisition)
        {
            var result = _requisitionService.AddRequisition(requisition);
            return result ? Ok(new { message = "Requisition added successfully" }) :
                            BadRequest(new { message = "Invalid requisition data" });
        }

        [HttpGet("getAllRequisitions")]
        public IActionResult GetAllRequisitions()
        {
            var requisitions = _requisitionService.GetAllRequisitions();
            return Ok(requisitions);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteRequisition(int id)
        {
            var result = _requisitionService.DeleteRequisition(id);
            return result ? Ok(new { message = "Requisition deleted successfully!" }) :
                            NotFound(new { message = "Requisition not found" });
        }
    }
}
