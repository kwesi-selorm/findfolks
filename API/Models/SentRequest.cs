namespace API.Models
{
    public class SentRequest
    {
        public required string RecipientId { get; set; }
        public DateTime DateSent { get; set; }
    }
}
