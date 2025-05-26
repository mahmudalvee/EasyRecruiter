using eRecruitment.Data;
using eRecruitment.Models;
using System.Collections.Generic;
using System.Linq;

namespace eRecruitment.Service
{
    public interface IRequisitionService
    {
        bool AddRequisition(Requisition requisition);
        List<Requisition> GetAllRequisitions();
        bool DeleteRequisition(int id);
    }

    public class RequisitionService : IRequisitionService
    {
        private readonly ApplicationDbContext _context;

        public RequisitionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool AddRequisition(Requisition requisition)
        {
            if (requisition == null) return false;

            _context.Requisitions.Add(requisition);
            _context.SaveChanges();
            return true;
        }

        public List<Requisition> GetAllRequisitions()
        {
            return _context.Requisitions.OrderByDescending(r => r.RequisitionID).ToList();
        }

        public bool DeleteRequisition(int id)
        {
            var requisition = _context.Requisitions.FirstOrDefault(r => r.RequisitionID == id);
            if (requisition == null) return false;

            _context.Requisitions.Remove(requisition);
            _context.SaveChanges();
            return true;
        }
    }
}
