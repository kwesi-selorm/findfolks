using API.DTOs;
using API.Models;
using API.Models.Data;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/folks")]
    public class FolkController : ControllerBase
    {
        private readonly FolkService folkService;
        private readonly ImageService imageService;
        private readonly AppDbContext dbContext;
        private readonly ILogger<FolkController> logger;

        public FolkController(
            FolkService service,
            ImageService service1,
            AppDbContext context,
            ILogger<FolkController> logger
        )
        {
            folkService = service;
            imageService = service1;
            dbContext = context;
            this.logger = logger;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<FolkDTO>>> GetFolks()
        {
            try
            {
                List<FolkDTO> folkRecords = await folkService.GetFolks();
                return Ok(folkRecords);
            }
            catch (Exception e)
            {
                return StatusCode(
                    statusCode: StatusCodes.Status500InternalServerError,
                    new { message = e.Message }
                );
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FolkDTO>> GetFolk(int id)
        {
            try
            {
                FolkDTO? folkRecord = await folkService.GetFolk(id);
                if (folkRecord == null)
                    return Problem(
                        detail: $"A folk with ID {id} was not found. Try creating a new profile",
                        statusCode: StatusCodes.Status404NotFound
                    );

                folkRecord.ProfilePhoto = await folkService.GetBase64String(id);
                return Ok(folkRecord);
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
        public async Task<ActionResult<FolkDTO>> CreateFolk([FromBody] Folk input)
        {
            FolkDTO? responseFolk = null;

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

        // TODO: ADD LOGIC TO ALSO UPDATE PROFILE PHOTOS
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
            int maxImageSize = 2 * 1024 * 1024; // 2MB
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
                        detail: "The image must be either of the following formats: jpg, jpeg and png, and must have a maximum size limit of 2MB",
                        statusCode: StatusCodes.Status400BadRequest
                    );
                }

                string profilePhotosPath = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "ProfilePhotos"
                );
                string filePath = Path.Combine(profilePhotosPath, Guid.NewGuid().ToString() + ext);

                await folkService.SaveProfilePhoto(id, filePath, input);
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
