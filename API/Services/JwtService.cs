using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using API.DTOs;

namespace API.Services
{
    public class JwtService
    {
        private const int TokenLifetime = 1; // 1 minute
        private readonly IConfiguration configuration;

        public JwtService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public AuthResponseDTO CreateToken(IdentityUser user)
        {
            DateTime expiration = DateTime.UtcNow.AddMinutes(TokenLifetime);
            JwtSecurityToken? token = CreateJwtToken(
                CreateClaims(user),
                CreateSigningCredentials(),
                expiration
            );
            JwtSecurityTokenHandler? tokenHandler = new JwtSecurityTokenHandler();
            return new AuthResponseDTO()
            {
                Token = tokenHandler.WriteToken(token),
                Expiration = expiration
            };
        }

        private Claim[] CreateClaims(IdentityUser user) =>
            new[]
            {
                new Claim(
                    JwtRegisteredClaimNames.Sub,
                    configuration["Jwt:Subject"] ?? string.Empty
                ),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.UserName ?? string.Empty),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty)
            };

        private SigningCredentials CreateSigningCredentials() =>
            new(
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(configuration["Jwt:Key"] ?? string.Empty)
                ),
                SecurityAlgorithms.HmacSha256
            );

        private JwtSecurityToken CreateJwtToken(
            Claim[] claims,
            SigningCredentials credentials,
            DateTime expiration
        ) =>
            new(
                configuration["Jwt:Issuer"],
                configuration["Jwt:Audience"],
                claims,
                expires: expiration,
                signingCredentials: credentials
            );
    }
}
