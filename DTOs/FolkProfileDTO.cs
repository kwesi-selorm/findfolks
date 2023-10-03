using API.Models;

namespace API.DTOs
{
    public class FolkProfileDTO : Folk
    {
        public string? ProfilePhoto { get; set; }
        public new List<ConnectionDTO> Connections { get; set; } = new();
    }
}
