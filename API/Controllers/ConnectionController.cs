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
        private readonly RequestService requestService;

        public ConnectionController(FolkService folkService, RequestService requestService)
        {
            this.folkService = folkService;
            this.requestService = requestService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateConnection([FromBody] CreateConnectionDTO input)
        {
            try
            {
                // REMOVE ALL RELATED REQUESTS
                await requestService.RemoveRequests(input.Folk1Id, input.Folk2Id);

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

        [HttpDelete]
        public async Task<ActionResult> DeleteConnections([FromBody] DeleteConnectionDTO input)
        {
            try
            {
                await folkService.RemoveConnections(input.Folk1Id, input.Folk2Id);
                return NoContent();
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
