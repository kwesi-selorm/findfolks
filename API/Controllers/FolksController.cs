using System.Net;
using API.Models;
using API.Models.Contexts;
using API.Models.Dtos;
using API.Services;
using API.Shared;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/folks")]
    public class FolksController : ControllerBase
    {
        private readonly FolkService dbService;
        private readonly AppDbContext dbContext;
        private readonly ILogger<FolksController> _logger;

        public FolksController(
            FolkService service,
            AppDbContext context,
            ILogger<FolksController> logger
        )
        {
            dbService = service;
            dbContext = context;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<List<FolkDto>> GetFolks()
        {
            try
            {
                return dbService.GetFolks();
            }
            catch (Exception e)
            {
                return Problem(
                    title: "Error getting folks",
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpGet("{id}")]
        public ActionResult<FolkDto> GetFolk(int id)
        {
            try
            {
                FolkDto? folkRecord = dbService.GetFolk(id);
                return folkRecord != null
                    ? Ok(folkRecord)
                    : Problem(
                        title: "Not found",
                        detail: $"A folk with ID {id} was not found. Try creating a new profile",
                        statusCode: StatusCodes.Status404NotFound
                    );
            }
            catch (Exception e)
            {
                return Problem(
                    title: "Error retrieving folk",
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpPost]
        public ActionResult<FolkDto> CreateFolk([FromBody] Folk folk)
        {
            Folk? recordWithSameName = dbContext.Folks.FirstOrDefault(f => f.Name == folk.Name);
            if (recordWithSameName != null)
            {
                return Problem(
                    title: "Conflict",
                    detail: $"A folk with the name {folk.Name} already exists; try a new one",
                    statusCode: StatusCodes.Status409Conflict
                );
            }

            try
            {
                FolkDto newFolk = dbService.AddFolk(folk);
                return CreatedAtAction(nameof(GetFolk), new { id = newFolk.Id }, newFolk);
            }
            catch (Exception e)
            {
                return Problem(
                    title: "Error creating folk",
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpPatch("{id}")]
        public ActionResult UpdateFolk(int id, [FromBody] PatchFolkBody update)
        {
            string? updateString = JsonConvert.SerializeObject(update);
            if (updateString == null)
            {
                return Problem(
                    title: "Parsing failed",
                    detail: "An error occurred while parsing the provided information",
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
            try
            {
                dbService.UpdateFolk(id, updateString);
                return NoContent();
            }
            catch (Exception e)
            {
                return Problem(
                    title: "Error updating data",
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }
    }
}
