using System.Net;
using API.Models;
using API.Models.Contexts;
using API.Models.Dtos;
using API.Services;
using API.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

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

        [HttpGet]
        public async Task<ActionResult<List<FolkDto>>> GetFolks()
        {
            try
            {
                return await dbService.GetFolks();
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
        public async Task<ActionResult<FolkDto>> GetFolk(int id)
        {
            try
            {
                FolkDto? folkRecord = await dbService.GetFolk(id);
                return folkRecord != null
                    ? Ok(folkRecord)
                    : Problem(
                        detail: $"A folk with ID {id} was not found. Try creating a new profile",
                        statusCode: StatusCodes.Status404NotFound
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

        [HttpPost]
        public async Task<ActionResult<FolkDto>> CreateFolk([FromBody] Folk folk)
        {
            Folk? recordWithSameName = await dbContext.Folks.FirstOrDefaultAsync(
                f => f.Name == folk.Name
            );
            if (recordWithSameName != null)
            {
                return Problem(
                    detail: $"A folk with the name {folk.Name} already exists; try creating using a different one",
                    statusCode: StatusCodes.Status409Conflict
                );
            }

            try
            {
                FolkDto newFolk = await dbService.AddFolk(folk);
                return CreatedAtAction(nameof(GetFolk), new { id = newFolk.Id }, newFolk);
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
        public async Task<ActionResult> UpdateFolk(int id, [FromBody] PatchFolkBody update)
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
