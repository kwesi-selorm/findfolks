using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Request
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int SenderId { get; set; }

        [Required]
        public int RecipientId { get; set; }

        public DateTime DateSent { get; set; }
    }
}
