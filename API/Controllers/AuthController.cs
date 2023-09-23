using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly JwtService jwtService;

        public AuthController(UserManager<IdentityUser> userManager, JwtService jwtService)
        {
            this.userManager = userManager;
            this.jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> CreateUser(UserDTO user)
        {
            IdentityResult? result = await userManager.CreateAsync(
                new IdentityUser() { UserName = user.UserName, Email = user.Email },
                user.Password
            );
            if (!result.Succeeded)
            {
                List<string>? errors = result.Errors
                    .Select(e => e.Description.TrimEnd('.'))
                    .ToList();
                string detail = string.Join(", ", errors);
                return Problem(detail: detail, statusCode: StatusCodes.Status400BadRequest);
            }
            return Created("", new UserDTO() { UserName = user.UserName, Email = user.Email });
        }

        [HttpGet("{userName}")]
        public async Task<IActionResult> GetUser(string userName)
        {
            IdentityUser? userRecord = await userManager.FindByNameAsync(userName);
            if (userRecord == null)
            {
                return Problem(
                    detail: $"A user with username {userName} was not found",
                    statusCode: StatusCodes.Status404NotFound
                );
            }
            return Ok(new { userRecord.UserName, userRecord.Email });
        }

        [HttpPost(template: "token")]
        public async Task<IActionResult> CreateToken(AuthRequestDTO loginRequest)
        {
            IdentityUser? user = await userManager.FindByNameAsync(loginRequest.UserName);
            if (user == null)
            {
                return Problem(
                    detail: $"Your username {loginRequest.UserName} was not found in our system",
                    statusCode: StatusCodes.Status404NotFound
                );
            }
            bool isPasswordValid = await userManager.CheckPasswordAsync(
                user,
                loginRequest.Password
            );
            if (!isPasswordValid)
            {
                return Problem(
                    detail: $"The password provided is incorrect",
                    statusCode: StatusCodes.Status401Unauthorized
                );
            }
            AuthResponseDTO? token = jwtService.CreateToken(user);
            return Ok(token);
        }

        // Update a user, either username and password
    }
}
