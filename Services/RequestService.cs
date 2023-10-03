using API.DTOs;
using API.Models;
using API.Models.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace API.Services
{
    public class RequestService
    {
        private readonly AppDbContext dbContext;
        private readonly FolkService folkService;
        private readonly ILogger<RequestService> logger;

        public RequestService(
            AppDbContext context,
            FolkService folkService,
            ILogger<RequestService> logger
        )
        {
            dbContext = context;
            this.folkService = folkService;
            this.logger = logger;
        }

        // FIND SINGLE REQUEST
        public async Task<Request?> FindSingleRequest(int senderId, int recipientId)
        {
            return await dbContext.Requests
                .Where(r => r.SenderId == senderId && r.RecipientId == recipientId)
                .FirstOrDefaultAsync();
        }

        // FIND ALL REQUESTS
        public async Task<RequestsDTO> FindRequestsForUser(int folkId)
        {
            List<SentRequestInfo> recipientInfos = new();
            List<ReceivedRequestInfo> senderInfos = new();

            List<Request> allRequests = await dbContext.Requests.ToListAsync();
            foreach (Request r in allRequests)
            {
                if (r.SenderId == folkId)
                    recipientInfos.Add(
                        new SentRequestInfo { recipientId = r.RecipientId, dateSent = r.DateSent }
                    );
                else if (r.RecipientId == folkId)
                    senderInfos.Add(
                        new ReceivedRequestInfo { senderId = r.SenderId, dateReceived = r.DateSent }
                    );
            }

            RequestsDTO requests =
                new() { sentRequests = recipientInfos, receivedRequests = senderInfos };
            return requests;
        }

        // CREATE NEW REQUEST
        public async Task<Request> AddRequest(Request createdRequest)
        {
            await dbContext.Requests.AddAsync(createdRequest);
            await dbContext.SaveChangesAsync();
            return createdRequest;
        }

        // DELETE REQUEST
        public async Task RemoveRequest(int id)
        {
            Request requestRecord =
                await dbContext.Requests.Where(r => r.Id == id).FirstOrDefaultAsync()
                ?? throw new Exception("A request with id " + id + "was not found");
            dbContext.Requests.Remove(requestRecord);
            await dbContext.SaveChangesAsync();
        }

        public async Task RemoveRequest(int senderId, int recipientId)
        {
            Request? requestRecord = await dbContext.Requests
                .Where(r => r.SenderId == senderId && r.RecipientId == recipientId)
                .FirstOrDefaultAsync();
            if (requestRecord != null)
                dbContext.Requests.Remove(requestRecord);
        }

        public async Task RemoveRequests(int folk1Id, int folk2Id)
        {
            List<Request>? requests = await dbContext.Requests
                .Where(
                    r =>
                        (r.SenderId == folk1Id && r.RecipientId == folk2Id)
                        || (r.SenderId == folk2Id && r.RecipientId == folk1Id)
                )
                .ToListAsync();
            dbContext.Requests.RemoveRange(requests);
            await dbContext.SaveChangesAsync();
        }
    }
}
