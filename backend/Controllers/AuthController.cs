using Microsoft.AspNetCore.Mvc;
using eRecruitment.Data;
using eRecruitment.Models;
using System.Linq;

namespace eRecruitment.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var dbUser = _context.Users.FirstOrDefault(u => u.UserNo == user.UserNo && u.Password == user.Password);
            if (dbUser != null)
            {
                return Ok(new { message = "Success", role = dbUser.UserNo == "Admin" ? "Admin" : "User" });
            }
            return Unauthorized(new { message = "Invalid credentials" });
        }
    }
}
