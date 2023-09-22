using System.ComponentModel.DataAnnotations;

namespace API.Models.Data
{
    public class ProfilePhoto
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string FilePath { get; set; } = string.Empty;
    }
}
