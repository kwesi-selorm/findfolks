using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/folks")]
    public class FolksController : ControllerBase
    {
        [HttpGet]
        public ActionResult<string> GetRoot()
        {
            return Ok("API basically works");
        }
    }
}
