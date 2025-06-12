using eRecruitment.Data;
using eRecruitment.Models;
using System.Collections.Generic;
using System.Linq;

namespace eRecruitment.Service
{
    public interface ICVBankService
    {
    }

    public class CVBankService : ICVBankService
    {
        private readonly ApplicationDbContext _context;

        public CVBankService(ApplicationDbContext context)
        {
            _context = context;
        }
    }
}
