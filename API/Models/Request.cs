namespace API.Models
{
    public class Request
    {
        public required string SenderId { get; set; }
        public required string RecipientId { get; set; }
        public DateTime DateSent { get; set; }
    }
}
