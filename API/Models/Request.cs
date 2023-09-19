using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }
        public required string SenderId { get; set; }
        public required string RecipientId { get; set; }
        public DateTime DateSent { get; set; }
    }
}
