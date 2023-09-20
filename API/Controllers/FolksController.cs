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
                    title: "An error occurred while retrieving the list of folks",
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
                if (folkRecord != null)
                    return Ok(folkRecord);

                return NotFound();
            }
            catch (Exception e)
            {
                return Problem(
                    title: "An error occurred while retrieving the folk's information",
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
                return Conflict(
                    new ProblemDetails
                    {
                        Title = "Conflict",
                        Detail = $"A folk with the name {folk.Name} already exists; try a new one",
                        Status = StatusCodes.Status409Conflict
                    }
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
                    title: "An error occurred while creating a folk for you. Give it another shot soon.",
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
                    detail: "An error occurred while parsing the provided information.",
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
                    title: "An error occurred while updating your data",
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }
    }
}
