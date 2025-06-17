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
    public interface IAssessmentService
    {
        List<Assessment> Get(int requisitionID);
        Task<string> Add(Assessment assessment);
        Task<string> AddMultiple(List<Assessment> assessments);
        Task<string> Delete(int id);
    }

    public class AssessmentService : IAssessmentService
    {
        private readonly ApplicationDbContext _context;
        private readonly HttpClient _httpClient;

        public AssessmentService(ApplicationDbContext context, IHttpClientFactory httpFactory)
        {
            _context = context;
            _httpClient = httpFactory.CreateClient();
        }

        public List<Assessment> Get(int requisitionID){
            List<Assessment> assessments = _context.Assessments.Where(a => a.RequisitionID == requisitionID).ToList();
            return assessments;
        }

        public async Task<string> Add(Assessment assessment)
        {
            if (assessment == null)
                return "Invalid data";

            assessment.TotalMarks = assessment.WrittenMarks + assessment.VivaMarks + assessment.OtherMarks;
            _context.Assessments.Add(assessment);
            await _context.SaveChangesAsync();

            return "Assessment added successfully";
        }

        public async Task<string> AddMultiple(List<Assessment> assessments)
        {
            if (assessments == null || !assessments.Any())
                return "No assessments provided";

            foreach (var assessment in assessments)
            {
                var existing = _context.Assessments
                    .FirstOrDefault(a => a.CVId == assessment.CVId && a.RequisitionID == assessment.RequisitionID);

                if (existing != null)
                {
                    existing.WrittenMarks = assessment.WrittenMarks;
                    existing.VivaMarks = assessment.VivaMarks;
                    existing.OtherMarks = assessment.OtherMarks;
                    existing.TotalMarks = assessment.WrittenMarks + assessment.VivaMarks + assessment.OtherMarks;
                    existing.Comment = assessment.Comment;
                    existing.IsSelected = assessment.IsSelected;
                }
                else
                {
                    assessment.TotalMarks = assessment.WrittenMarks + assessment.VivaMarks + assessment.OtherMarks;
                    _context.Assessments.Add(assessment);
                }
            }

            await _context.SaveChangesAsync();
            return "Assessments added/updated successfully";
        }

        public async Task<string> Delete(int id)
        {
            var assessment = _context.Assessments.FirstOrDefault(a => a.AssessmentId == id);
            if (assessment == null)
                return "Assessment not found";

            _context.Assessments.Remove(assessment);
            await _context.SaveChangesAsync();
            return "Assessment deleted successfully";
        }
    }
}