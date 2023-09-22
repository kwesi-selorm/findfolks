using API.DTOs;
using API.Models;
using API.Models.Data;
using API.Services;
using API.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

using static API.Utils.Constants;

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
        public async Task<ActionResult<List<ResponseFolkDTO>>> GetFolks()
        {
            try
            {
                List<FolkDTO> folkRecords = await folkService.GetFolks();
                List<ResponseFolkDTO> responseFolks = new();
                foreach (FolkDTO record in folkRecords)
                {
                    ResponseFolkDTO responseFolk = folkService.CreateResponseFolkDTO(record);
                    ProfilePhoto? photo = record.ProfilePhoto;
                    if (photo == null)
                    {
                        responseFolk.ProfilePhoto = null;
                        responseFolks.Add(responseFolk);
                        continue;
                    }
                    string? base64String = await imageService.ConvertImageToBase64String(
                        photo.FilePath
                    );
                    responseFolk.ProfilePhoto = base64String;
                    responseFolks.Add(responseFolk);
                }
                return Ok(responseFolks);
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
        public async Task<ActionResult<ResponseFolkDTO>> GetFolk(int id)
        {
            try
            {
                FolkDTO? folkRecord = await folkService.GetFolk(id);
                if (folkRecord == null)
                {
                    return Problem(
                        detail: $"A folk with ID {id} was not found. Try creating a new profile",
                        statusCode: StatusCodes.Status404NotFound
                    );
                }
                ResponseFolkDTO responseFolk = folkService.CreateResponseFolkDTO(folkRecord);
                ProfilePhoto? photo = folkRecord.ProfilePhoto;
                logger.LogInformation("photo: " + JsonConvert.SerializeObject(photo));
                if (photo == null)
                {
                    responseFolk.ProfilePhoto = null;
                    return Ok(folkRecord);
                }

                string? base64String = await imageService.ConvertImageToBase64String(
                    photo.FilePath
                );
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

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<ResponseFolkDTO>> CreateFolk(
            [FromForm] string name,
            [FromForm] string homeCountry,
            [FromForm] string homeCityOrTown,
            [FromForm] string countryOfResidence,
            [FromForm] string cityOrTownOfResidence,
            [FromForm] ContactMethods preferredContactMethod,
            [FromForm] string contactInfo,
            [FromForm] IFormFile profilePhoto
        )
        {
            Folk createdFolk =
                new()
                {
                    Name = name,
                    HomeCountry = homeCountry,
                    HomeCityOrTown = homeCityOrTown,
                    CountryOfResidence = countryOfResidence,
                    CityOrTownOfResidence = cityOrTownOfResidence,
                    PreferredContactMethod = preferredContactMethod,
                    ContactInfo = contactInfo,
                };
            ResponseFolkDTO? responseFolk = null;

            Folk? recordWithSameName = await dbContext.Folks.FirstOrDefaultAsync(
                f => f.Name == name
            );
            if (recordWithSameName != null)
            {
                return Problem(
                    detail: $"A folk with the name {name} already exists; try using a different one",
                    statusCode: StatusCodes.Status409Conflict
                );
            }

            try
            {
                // SAVE THE PROFILE PHOTO TO THE FILE SYSTEM AND DATABASE
                int maxImageSize = 2 * 1024 * 1024; // 2MB
                Constants? constants = new();
                if (profilePhoto != null)
                {
                    string ext = Path.GetExtension(profilePhoto.FileName).ToLowerInvariant();
                    if (
                        profilePhoto.Length == 0
                        || profilePhoto.Length > maxImageSize
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
                    string filePath = Path.Combine(
                        profilePhotosPath,
                        Guid.NewGuid().ToString() + ext
                    );

                    using (FileStream stream = System.IO.File.Create(filePath))
                    {
                        await profilePhoto.CopyToAsync(stream);
                    }

                    // SAVE THE CREATED FOLK TO THE DATABASE
                    ProfilePhoto photo =
                        new() { Name = profilePhoto.FileName, FilePath = filePath };
                    createdFolk.ProfilePhoto = photo;

                    responseFolk = await folkService.AddFolk(createdFolk);

                    // CONVERT THE IMAGE FILE TO A BASE64 STRING AND ADD TO THE RESPONSE
                    string? base64String = await imageService.ConvertImageToBase64String(filePath);
                    responseFolk.ProfilePhoto = base64String;
                    return Ok(responseFolk);
                }
                else
                {
                    return Ok(responseFolk);
                }
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
    }
}
