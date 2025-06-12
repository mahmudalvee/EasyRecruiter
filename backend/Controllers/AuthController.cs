using Microsoft.AspNetCore.Mvc;
using eRecruitment.Data;
using eRecruitment.Models;
using System.Linq;
using eRecruitment.Service;
using Microsoft.AspNetCore.Identity;

namespace eRecruitment.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] User user)
        {
            var (isValid, role) = _authService.Login(user);
            if (isValid)
            {
                return Ok(new { message = "Success", role });
            }
            return Unauthorized(new { message = "Invalid credentials" });
        }
    }
}
