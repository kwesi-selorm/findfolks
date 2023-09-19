using API.Models;
using API.Models.Dtos;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/folks")]
    public class FolksController : ControllerBase
    {
        private readonly FolksService dbService;

        public FolksController(FolksService service)
        {
            dbService = service;
        }

        [HttpGet]
        public ActionResult<List<FolkDto>> GetFolks()
        {
            return dbService.GetFolks();
        }

        [HttpPost]
        public ActionResult<FolkDto> CreateFolk([FromBody] Folk folk)
        {
            return dbService.AddFolk(folk);
        }
    }
}
