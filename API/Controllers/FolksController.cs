using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/folks")]
    public class FolksController : ControllerBase
    {
        [HttpGet("/test")]
        public ActionResult<string> GetRoot()
        {
            return Ok("API root works!");
        }

        // [HttpGet]
        // [Route("api/folks/test")]
    }
}
