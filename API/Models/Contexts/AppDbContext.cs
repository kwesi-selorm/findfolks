using Microsoft.EntityFrameworkCore;

namespace API.Models.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Folk> Folks { get; set; }
        public DbSet<Request> Requests { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }
    }
}
