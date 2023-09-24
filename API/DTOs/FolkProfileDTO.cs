using API.Models;

namespace API.DTOs
{
    public class FolkProfileDTO : Folk
    {
        public new List<ConnectionDTO> Connections { get; set; } = new();
    }
}
