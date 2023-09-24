using API.Models;
using API.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class RequestService
    {
        private readonly AppDbContext dbContext;

        public RequestService(AppDbContext context)
        {
            dbContext = context;
        }

        // FIND SINGLE REQUEST
        public async Task<Request?> FindSingleRequest(int id)
        {
            return await dbContext.Requests.FindAsync(id);
        }

        // FIND ALL REQUESTS
        public async Task<List<Request>> FindRequestsForUser(int id)
        {
            return await dbContext.Requests
                .Where(r => r.SenderId == id || r.RecipientId == id)
                .ToListAsync();
        }

        // CREATE NEW REQUEST
        public async Task<Request> AddRequest(Request createdRequest)
        {
            await dbContext.Requests.AddAsync(createdRequest);
            await dbContext.SaveChangesAsync();
            return createdRequest;
        }

        // DELETE REQUEST
        public async Task RemoveRequest(Request request)
        {
            dbContext.Requests.Remove(request);
            await dbContext.SaveChangesAsync();
        }
    }
}
