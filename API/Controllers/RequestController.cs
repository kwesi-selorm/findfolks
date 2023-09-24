using API.DTOs;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/requests")]
    public class RequestController : ControllerBase
    {
        private readonly RequestService requestService;

        public RequestController(RequestService requestService)
        {
            this.requestService = requestService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetSingleRequest(int id)
        {
            try
            {
                Request? requestRecord = await requestService.FindSingleRequest(id);
                return requestRecord == null
                    ? Problem(
                        detail: "Request not found",
                        statusCode: StatusCodes.Status404NotFound
                    )
                    : Ok(requestRecord);
            }
            catch (Exception e)
            {
                return Problem(
                    detail: "Something went wrong: " + e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<Request>>> GetRequests(int id)
        {
            try
            {
                List<Request> requests = await requestService.FindRequestsForUser(id);
                return Ok(requests);
            }
            catch (Exception e)
            {
                return Problem(
                    detail: "Something went wrong: " + e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }

        [HttpPost]
        public async Task<ActionResult<Request>> CreateRequest([FromBody] CreateRequestDTO input)
        {
            DateTime DateSent = DateTime.UtcNow;
            Request newRequest =
                new()
                {
                    SenderId = input.SenderId,
                    RecipientId = input.RecipientId,
                    DateSent = DateSent
                };
            try
            {
                await requestService.AddRequest(newRequest);
                return CreatedAtAction("GetSingleRequest", new { id = newRequest.Id }, newRequest);
            }
            catch (Exception e)
            {
                return Problem(
                    detail: "Something went wrong: " + e.Message,
                    statusCode: StatusCodes.Status500InternalServerError
                );
            }
        }
    }
}
