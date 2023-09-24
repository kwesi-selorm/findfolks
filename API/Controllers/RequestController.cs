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

        // [HttpGet("{id}")]
        // public async Task<ActionResult> GetSingleRequest(int id)
        // {
        //     try
        //     {
        //         Request? requestRecord = await requestService.FindSingleRequest(id);
        //         return requestRecord == null
        //             ? Problem(
        //                 detail: "Request not found",
        //                 statusCode: StatusCodes.Status404NotFound
        //             )
        //             : Ok(requestRecord);
        //     }
        //     catch (Exception e)
        //     {
        //         return Problem(
        //             detail: "Something went wrong: " + e.Message,
        //             statusCode: StatusCodes.Status500InternalServerError
        //         );
        //     }
        // }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<Request>>> GetRequests(int userId)
        {
            try
            {
                List<Request> requests = await requestService.FindRequestsForUser(userId);
                return Ok(requests);
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

        [HttpPost]
        public async Task<ActionResult<Request>> CreateRequest([FromBody] CreateRequestDTO input)
        {
            // Check if the request already exists or the sender and recipient are connected
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
