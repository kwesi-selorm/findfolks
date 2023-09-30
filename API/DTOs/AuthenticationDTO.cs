using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class AuthRequestDTO
    {
        [Required]
        public string UserName { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class AuthResponseDTO
    {
        public string Token { get; set; } = string.Empty;
        public DateTime Expiration { get; set; }
    }

    public class LoggedInUserDTO : AuthResponseDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; }
    }
}
