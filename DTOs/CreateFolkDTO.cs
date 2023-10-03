using API.Models;

namespace API.DTOs
{
	public class CreateFolkDTO: Folk
    {
        public required string Email { get; set; }
        public required string Password { get; set; }

    }
}