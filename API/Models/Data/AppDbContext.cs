using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Models.Data
{
    public class AppDbContext : IdentityUserContext<IdentityUser>
    // CREATE AN INDEPENDENT USER MODEL AND PROVIDE IT HERE IF ADDITIONAL COLUMNS ARE NEEDED (e.g., SUBSCRIBED OR PAYING USER FIELDS). THE CLASS WILL INHERIT FROM IDENTITYUSER
    {
        public DbSet<Folk> Folks { get; set; }
        public DbSet<Request> Requests { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
