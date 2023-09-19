using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class Connection
    {
        [Key]
        public int ConnectionId { get; set; }
        public required Folk FolkId { get; set; }
        public DateTime DateConnected { get; set; }
    }
}
