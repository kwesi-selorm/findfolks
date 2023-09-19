using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Request
    {
        [Key]
        public int RequestKey { get; set; }
        public required string SenderId { get; set; }
        public required string RecipientId { get; set; }
        public DateTime DateSent { get; set; }
    }
}
