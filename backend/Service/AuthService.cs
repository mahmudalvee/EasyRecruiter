using eRecruitment.Data;
using eRecruitment.Models;
using System.Linq;

namespace eRecruitment.Service
{
    public interface IAuthService
    {
        (bool isValid, string role) Login(User user);
    }

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public (bool isValid, string role) Login(User user)
        {
            var dbUser = _context.Users.FirstOrDefault(u => u.UserNo == user.UserNo && u.Password == user.Password);
            if (dbUser != null)
            {
                //var role = dbUser.UserNo == "Admin" ? "Admin" : "User";
                var role = (dbUser.UserNo).ToLower() == "admin" ? "Admin" : "User";
                if (role == "Admin") return (true, role);
                else return (false, null);
            }
            return (false, null);
        }
    }
}
