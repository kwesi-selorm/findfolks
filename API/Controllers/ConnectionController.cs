using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/connections")]
    public class ConnectionController : ControllerBase
    {
        private readonly FolkService folkService;

        public ConnectionController(FolkService folkService)
        {
            this.folkService = folkService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateConnection(CreateConnectionDTO input)
        {
            try
            {
                await folkService.AddConnections(input.Folk1Id, input.Folk2Id);
                return Ok();
            }
            catch (Exception e)
            {
                return Problem(
                    title: "Something went wrong",
                    detail: e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }
    }
}
