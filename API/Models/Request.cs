using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Request
    {
        [Key]
        public int RequestId { get; set; }
        public required int SenderId { get; set; }
        public required int RecipientId { get; set; }
        public DateTime DateSent { get; set; }
    }
}
