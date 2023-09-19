namespace API.Models
{
    public class ReceivedRequest
    {
        public required string SenderId { get; set; }
        public DateTime DateReceived { get; set; }
    }
}
