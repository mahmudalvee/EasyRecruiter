using Microsoft.AspNetCore.Mvc;
using eRecruitment.Data;
using eRecruitment.Models;
using System.Linq;
using System;

namespace eRecruitment.Controllers
{
    [Route("api/requisition")]
    [ApiController]
    public class RecruitmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RecruitmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("addRecruitment")]
        public IActionResult AddRequisition([FromBody] Requisition requisition)
        {
            try
            {
                if (requisition == null)
                {
                    return BadRequest(new { message = "Invalid requisition data" });
                }

                _context.Requisitions.Add(requisition);
                _context.SaveChanges();

                return Ok(new { message = "Requisition added successfully" });
            }
            catch(Exception e)
            {
                return BadRequest(new { message = "Error Occured" });
            }
        }

        [HttpGet("getAllRequisitions")]
        public IActionResult GetAllRequisitions()
        {
            var requisitions = _context.Requisitions.OrderByDescending(r => r.RequisitionID).ToList();
            return Ok(requisitions);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteRequisition(int id)
        {
            try
            {
                var requisition = _context.Requisitions.FirstOrDefault(r => r.RequisitionID == id);
                if (requisition == null)
                {
                    return NotFound(new { message = "Requisition not found" });
                }

                _context.Requisitions.Remove(requisition);
                _context.SaveChanges();

                return Ok(new { message = "Requisition deleted successfully!" });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Error Occured while deleting Requisition" });
            }
        }
    }
}
