using API.DTOs;
using API.Models;
using API.Models.Data;
using API.Services;
using API.Shared;
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
        public async Task<ActionResult<FolkDTO>> CreateFolk([FromBody] Folk folk)
        {
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
                FolkDTO newFolk = await dbService.AddFolk(folk);
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
