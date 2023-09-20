using API.Models;
using API.Models.Contexts;
using API.Models.Dtos;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

namespace API.Controllers
{
    [ApiController]
    [Route("api/folks")]
    public class FolksController : ControllerBase
    {
        private readonly FolkService dbService;
        private readonly AppDbContext dbContext;

        public FolksController(FolkService service, AppDbContext context)
        {
            dbService = service;
            dbContext = context;
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

            FolkDto newFolk = dbService.AddFolk(folk);
            return CreatedAtAction(nameof(GetFolk), new { id = newFolk.Id }, newFolk);
        }
    }
}
