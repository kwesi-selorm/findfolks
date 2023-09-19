using Microsoft.EntityFrameworkCore;

namespace API.Models.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Folk> Folks { get; set; }
        public DbSet<Request> Requests { get; set; }

        private readonly IConfiguration _configuration;

        public AppDbContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}
