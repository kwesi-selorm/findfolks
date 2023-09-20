using API.Models;
using API.Models.Contexts;

namespace API.Services
{
    public class RequestService
    {
        private readonly AppDbContext dbContext;

        public RequestService(AppDbContext context)
        {
            dbContext = context;
        }

        // CREATE NEW REQUEST
        public Request AddNewRequest(int senderId, int recipientId)
        {
            Request newRequest =
                new()
                {
                    SenderId = senderId,
                    RecipientId = recipientId,
                    DateSent = DateTime.Now
                };
            dbContext.Requests.Add(newRequest);
            dbContext.SaveChanges();
            return newRequest;
        }

        // DELETE REQUEST
        public void DeleteRequest(Request request)
        {
            dbContext.Requests.Remove(request);
            dbContext.SaveChanges();
        }
    }
}
