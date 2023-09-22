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
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Net.Mime;

namespace API.Controllers
{
    [ApiController]
    [Route("api/folks")]
    public class FolkController : ControllerBase
    {
        private readonly FolkService dbService;
        private readonly AppDbContext dbContext;
        private readonly ILogger<FolkController> logger;

        public FolkController(
            FolkService service,
            AppDbContext context,
            ILogger<FolkController> logger
        )
        {
            dbService = service;
            dbContext = context;
            this.logger = logger;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<FolkDTO>>> GetFolks()
        {
            try
            {
                return await dbService.GetFolks();
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
                FolkDTO? folkRecord = await dbService.GetFolk(id);
                if (folkRecord == null)
                {
                    return Problem(
                        detail: $"A folk with ID {id} was not found. Try creating a new profile",
                        statusCode: StatusCodes.Status404NotFound
                    );
                }
                ProfilePhoto? photo = await dbContext.ProfilePhotos.FirstOrDefaultAsync(
                    p => p.UserId == folkRecord.Id
                );
                if (photo == null)
                    return Ok(folkRecord);

                string filePath = photo.FilePath;
                try
                {
                    byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                    if (fileBytes.Length == 0)
                    {
                        return Ok(folkRecord);
                    }
                    MemoryStream memoryStream = new(fileBytes);

                    string fileName = Path.GetFileName(filePath);
                    string fileExtension = Path.GetExtension(filePath);

                    FormFile profilePhoto = new FormFile(
                        memoryStream,
                        0,
                        memoryStream.Length,
                        string.Empty,
                        fileName
                    );

                    return Ok(
                        new FolkDTO()
                        {
                            Id = folkRecord.Id,
                            Name = folkRecord.Name,
                            HomeCountry = folkRecord.HomeCountry,
                            CountryOfResidence = folkRecord.CountryOfResidence,
                            HomeCityOrTown = folkRecord.HomeCityOrTown,
                            CityOrTownOfResidence = folkRecord.CityOrTownOfResidence,
                            ProfilePhoto = profilePhoto
                        }
                    );
                }
                catch (Exception e)
                {
                    logger.LogInformation("{0}", e.Message);
                    return Problem(
                        detail: e.Message,
                        statusCode: StatusCodes.Status500InternalServerError
                    );
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

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<FolkDTO>> CreateFolk(
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
            CreateFolkDTO? folk =
                new()
                {
                    Name = name,
                    HomeCountry = homeCountry,
                    HomeCityOrTown = homeCityOrTown,
                    CountryOfResidence = countryOfResidence,
                    CityOrTownOfResidence = cityOrTownOfResidence,
                    PreferredContactMethod = preferredContactMethod,
                    ContactInfo = contactInfo,
                    ProfilePhoto = profilePhoto
                };

            string? str = JsonConvert.SerializeObject(folk);
            Folk? recordWithSameName = await dbContext.Folks.FirstOrDefaultAsync(
                f => f.Name == folk.Name
            );
            if (recordWithSameName != null)
            {
                return Problem(
                    detail: $"A folk with the name {folk.Name} already exists; try using a different one",
                    statusCode: StatusCodes.Status409Conflict
                );
            }

            try
            {
                // SAVE THE NEW FOLK TO THE DATABASE
                FolkDTO newFolk = await dbService.AddFolk(folk);

                FormFile? responseProfilePhoto = null;
                int maxImageSize = 2 * 1024 * 1024; // 2MB
                Constants? constants = new();

                // SAVE THE PROFILE PHOTO TO THE FILE SYSTEM AND DATABASE
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
                            title: "Inlvaid image file",
                            detail: "The image must be either of the following formats: jpg, jpeg and png, and have a maximum size limit of 2MB",
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

                    using FileStream stream = System.IO.File.Create(filePath);
                    await profilePhoto.CopyToAsync(stream);

                    ProfilePhoto photo =
                        new()
                        {
                            UserId = newFolk.Id,
                            Name = profilePhoto.FileName,
                            FilePath = filePath
                        };
                    dbContext.ProfilePhotos.Add(photo);
                    await dbContext.SaveChangesAsync();

                    // CONVERT THE STREAM TO A FORMFILE TO INCLUDE IN RESPONSE
                    responseProfilePhoto = new FormFile(
                        stream,
                        0,
                        stream.Length,
                        string.Empty,
                        profilePhoto.FileName
                    )
                    {
                        Headers = new HeaderDictionary(),
                        ContentDisposition =
                            $"form-data; name=\"file\"; filename=\"{profilePhoto.FileName}\""
                    };
                    ;
                }

                // logger.LogInformation("{0}", response);

                return Ok(
                    new
                    {
                        newFolk.Id,
                        newFolk.Name,
                        newFolk.HomeCountry,
                        newFolk.CountryOfResidence,
                        newFolk.HomeCityOrTown,
                        newFolk.CityOrTownOfResidence,
                        ProfilePhoto = responseProfilePhoto
                    }
                );
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
                await dbService.UpdateFolk(id, updateString);
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
