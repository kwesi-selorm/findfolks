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
        private readonly FolkService folkService;

        public AuthController(
            UserManager<IdentityUser> userManager,
            JwtService jwtService,
            FolkService folkService
        )
        {
            this.userManager = userManager;
            this.jwtService = jwtService;
            this.folkService = folkService;
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            FolkDTO? folkRecord = await folkService.GetFolk(id);
            if (folkRecord == null)
                return NoContent();
            IdentityUser? userRecord = await userManager.FindByNameAsync(folkRecord.Name);
            if (userRecord == null)
            {
                return Problem(
                    detail: $"A user with id {id} was not found",
                    statusCode: StatusCodes.Status404NotFound
                );
            }
            await userManager.DeleteAsync(userRecord);
            return NoContent();
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
