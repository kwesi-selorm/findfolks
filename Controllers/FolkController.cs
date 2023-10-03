using API.DTOs;
using API.Models;
using API.Models.Data;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers
{
    [ApiController]
    [Route("api/folks")]
    public class FolkController : ControllerBase
    {
        private readonly FolkService folkService;
        private readonly ProfilePhotoService profilePhotoService;
        private readonly ImageService imageService;
        private readonly AuthService authService;
        private readonly AppDbContext dbContext;
        private readonly ILogger<FolkController> logger;

        public FolkController(
            FolkService folkService,
            ProfilePhotoService profilePhotoService,
            ImageService imageService,
            AuthService authService,
            AppDbContext context,
            ILogger<FolkController> logger
        )
        {
            this.folkService = folkService;
            this.profilePhotoService = profilePhotoService;
            this.imageService = imageService;
            this.authService = authService;
            dbContext = context;
            this.logger = logger;
        }

        // [Authorize]
        [HttpGet("discover/{id}")]
        public async Task<ActionResult<List<FolkDTO>>> GetFolksToDiscover(int id)
        {
            try
            {
                List<FolkDTO> folkRecords = await folkService.GetFolksForUser(id);
                return Ok(folkRecords);
            }
            catch (Exception e)
            {
                return Problem(
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FolkDTO>> GetUserFolkProfile(int id)
        {
            try
            {
                FolkProfileDTO? folkRecord = await folkService.GetFolkProfile(id);
                return (folkRecord == null)
                    ? Problem(
                        detail: $"Your profile with {id} was not found. Try creating a new profile",
                        statusCode: StatusCodes.Status404NotFound
                    )
                    : Ok(folkRecord);
            }
            catch (Exception e)
            {
                return Problem(
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpPost]
        public async Task<ActionResult<FolkDTO>> CreateFolk([FromBody] CreateFolkDTO input)
        {
            FolkDTO responseFolk;
            Folk? recordWithSameName = await dbContext.Folks.FirstOrDefaultAsync(
                f => f.Name == input.Name
            );
            if (recordWithSameName != null)
                return Problem(
                    detail: $"A folk with the name {input.Name} already exists; try a different one",
                    statusCode: StatusCodes.Status409Conflict
                );

            try
            {
                await authService.CreateUser(input);
                responseFolk = await folkService.AddFolk(input);
                string? base64String = await folkService.GetBase64String(responseFolk.Id);
                responseFolk.ProfilePhoto = base64String;
                return Ok(responseFolk);
            }
            catch (Exception e)
            {
                return Problem(
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpPatch("{id}")]
        public async Task<ActionResult> UpdateFolk(int id, [FromBody] UpdateFolkDTO update)
        {
            string? updateString = JsonConvert.SerializeObject(update);
            if (updateString == null)
            {
                return Problem(
                    detail: "An error occurred while parsing the provided information",
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
            try
            {
                await folkService.UpdateFolk(id, updateString);
                return NoContent();
            }
            catch (Exception e)
            {
                return Problem(
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFolk(int id)
        {
            try
            {
                string? filePath = await profilePhotoService.GetProfilePhotoPath(id);
                imageService.DeleteImageFromFileSystem(filePath);
                await authService.DeleteUser(id);
                await profilePhotoService.RemoveProfilePhoto(id);
                await folkService.RemoveFolk(id);

                return StatusCode(statusCode: StatusCodes.Status204NoContent);
            }
            catch (Exception e)
            {
                return Problem(
                    title: "An error occurred while deleting your profile and account",
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpPost("photo/{id}")]
        public async Task<ActionResult> SaveProfilePhoto(int id, [FromForm] IFormFile? input = null)
        {
            if (input == null)
            {
                return Problem(
                    title: "Missing or invalid image file",
                    detail: "No image provided",
                    statusCode: StatusCodes.Status400BadRequest
                );
            }
            int maxImageSize = 1 * 1024 * 1024; // 2MB
            Constants? constants = new();

            try
            {
                string ext = Path.GetExtension(input.FileName).ToLowerInvariant();
                if (
                    input.Length == 0
                    || input.Length > maxImageSize
                    || !constants.allowedExtensions.Contains(ext)
                )
                {
                    return Problem(
                        title: "Invalid image format",
                        detail: "The image must be either of the following formats: jpg, jpeg and png, and must have a maximum size limit of 1MB",
                        statusCode: StatusCodes.Status400BadRequest
                    );
                }

                string profilePhotosPath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "ProfilePhotos"
                );
                string filePath = Path.Combine(profilePhotosPath, Guid.NewGuid().ToString() + ext);

                // DELETE THE PREVIOUS IMAGE IF IT EXISTS
                string? previousFilePath = await profilePhotoService.GetProfilePhotoPath(id);
                imageService.DeleteImageFromFileSystem(previousFilePath);

                // SAVE THE NEW PHOTO TO THE DATABASE AND FILE SYSTEM
                await profilePhotoService.AddOrUpdateProfilePhoto(id, filePath, input);
                using (FileStream stream = System.IO.File.Create(filePath))
                {
                    await input.CopyToAsync(stream);
                }
                string? base64String = await imageService.ConvertImageToBase64String(filePath);
                return Ok(new PhotoDTO { Base64String = base64String });
            }
            catch (Exception e)
            {
                return Problem(
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }
    }
}
