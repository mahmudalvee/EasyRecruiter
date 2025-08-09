using backend.Helper;
using eRecruitment.Data;
using eRecruitment.Models;
using System.Linq;
using System.Runtime.ConstrainedExecution;

namespace eRecruitment.Service
{
    public interface IAuthService
    {
        (bool isValid, string role) Login(User user);
        string? LoginJWT(User user);
        string? Authenticate(string username, string password);

    }

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthService(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
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

        public string? LoginJWT(User user)
        {
            var dbUser = _context.Users.FirstOrDefault(u => u.UserNo == user.UserNo && u.Password == user.Password);
            if (dbUser != null)
            {
                return JwtTokenGenerator.GenerateToken(dbUser.UserNo, _config);
            }

            return null;
        }

        public string? Authenticate(string username, string password)
        {
            if (username == "admin" && password == "1234")
            {
                return JwtTokenGenerator.GenerateToken(username, _config);
            }

            return null;
        }
    }
}
