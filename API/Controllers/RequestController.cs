using API.DTOs;
using API.Models;
using API.Models.Data;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Controllers
{
    [ApiController]
    [Route("api/requests")]
    public class RequestController : ControllerBase
    {
        private readonly RequestService requestService;
        private readonly AppDbContext dbContext;
        private readonly ILogger<RequestController> logger;

        public RequestController(
            RequestService requestService,
            AppDbContext dbContext,
            ILogger<RequestController> logger
        )
        {
            this.requestService = requestService;
            this.dbContext = dbContext;
            this.logger = logger;
        }

        [HttpGet("{folkId}")]
        public async Task<ActionResult<string>> GetRequests(int folkId)
        {
            try
            {
                RequestsDTO? requests = await requestService.FindRequestsForUser(folkId);
                return Ok(JsonConvert.SerializeObject(requests));
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
        public async Task<ActionResult<Request?>> CreateRequest([FromBody] CreateRequestDTO input)
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
                // CHECK IF THE REQUEST ALREADY EXISTS
                Request? requestRecord = await requestService.FindSingleRequest(
                    input.SenderId,
                    input.RecipientId
                );
                if (requestRecord != null)
                    return requestRecord;

                // CHECK IF THE FOLKS ARE ALREADY CONNECTED
                Folk? senderRecord = await dbContext.Folks
                    .Where(f => f.Id == input.SenderId)
                    .Include(f => f.Connections)
                    .FirstOrDefaultAsync();

                if (senderRecord != null)
                {
                    Folk? existingConnection = senderRecord.Connections.FirstOrDefault(
                        c => c.Id == input.RecipientId
                    );
                    if (existingConnection != null)
                        return Problem(
                            detail: "You are already connected",
                            statusCode: StatusCodes.Status409Conflict
                        );
                }

                await requestService.AddRequest(newRequest);
                return Created("", newRequest);
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

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteRequest(int id)
        {
            try
            {
                await requestService.RemoveRequest(id);
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
