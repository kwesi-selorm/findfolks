using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class ProfilePhoto
    {
        [Key]
        [Required]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string FilePath { get; set; } = string.Empty;
    }
}
