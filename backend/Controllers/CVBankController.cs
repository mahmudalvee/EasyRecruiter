using eRecruitment.Data;
using eRecruitment.Models;
using eRecruitment.Service;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.RegularExpressions;
using UglyToad.PdfPig;

[ApiController]
[Route("api/[controller]")]
public class CVBankController : ControllerBase
{
    private readonly ICVBankService _cvBankService;

    public CVBankController(ICVBankService cvBankService)
    {
        _cvBankService = cvBankService;
    }

    [HttpGet("{requisitionID}")]
    public IActionResult GetCVsByRequisition(int requisitionID)
    {
        var cvs = _cvBankService.GetCVsByRequisition(requisitionID);
        if (!cvs.Any())
            return NotFound(new { message = "No CVs found for this requisition" });

        return Ok(cvs);
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadCV([FromForm] IFormFile file, [FromForm] int requisitionID)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "No file uploaded" });

        try
        {
            var cv = await _cvBankService.ProcessAndSaveCVAsync(file, requisitionID);
            return Ok(new { message = "CV uploaded and processed successfully", cv.Name, cv.Email, cv.Phone, cv.Education });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error processing CV", error = ex.Message });
        }
    }

    [HttpPost("uploadCVs")]
    public async Task<IActionResult> UploadMultipleCVs([FromForm] List<IFormFile> files, [FromForm] int requisitionID)
    {
        if (files == null || files.Count == 0)
            return BadRequest(new { message = "No files uploaded" });

        var uploadedResults = new List<object>();

        foreach (var file in files)
        {
            try
            {
                var cv = await _cvBankService.ProcessAndSaveCVAsync(file, requisitionID);
                uploadedResults.Add(new
                {
                    status = "Success",
                    cv.Name,
                    cv.Email,
                    cv.Phone,
                    cv.Education
                });
            }
            catch (Exception ex)
            {
                uploadedResults.Add(new
                {
                    status = "Failed",
                    fileName = file.FileName,
                    error = ex.Message
                });
            }
        }

        return Ok(new { message = "Upload completed", results = uploadedResults });
    }


    [HttpDelete("delete/{id}")]
    public IActionResult DeleteCV(int id)
    {
        var success = _cvBankService.DeleteCV(id);
        if (!success)
            return NotFound(new { message = "CV not found" });

        return Ok(new { message = "CV deleted successfully" });
    }

}