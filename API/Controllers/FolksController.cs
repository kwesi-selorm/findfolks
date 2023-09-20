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
        private readonly FolksService dbService;
        private readonly AppDbContext dbContext;

        public FolksController(FolksService service, AppDbContext context)
        {
            dbService = service;
            dbContext = context;
        }

        [HttpGet]
        public ActionResult<List<FolkDto>> GetFolks()
        {
            return dbService.GetFolks();
        }

        [HttpGet("{id}")]
        public ActionResult<FolkDto> GetFolk(int id)
        {
            FolkDto? folkRecord = dbService.GetFolk(id);
            if (folkRecord != null)
            {
                return Ok(folkRecord);
            }
            return NotFound();
        }

        [HttpPost]
        public ActionResult<FolkDto> CreateFolk([FromBody] Folk folk)
        {
            var existingRecord = dbContext.Folks.Where(f => f.Name == folk.Name);
            if (existingRecord != null)
            {
                return BadRequest();
            }

            FolkDto newFolk = dbService.AddFolk(folk);
            return CreatedAtAction(nameof(GetFolk), new { id = newFolk.Id }, newFolk);
        }
    }
}
