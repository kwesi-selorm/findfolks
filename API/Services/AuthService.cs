using API.DTOs;
using Microsoft.AspNetCore.Identity;

namespace API.Services
{
    public class AuthService
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly FolkService folkService;
        private readonly ILogger<AuthService> logger;

        public AuthService(
            UserManager<IdentityUser> userManager,
            FolkService folkService,
            ILogger<AuthService> logger
        )
        {
            this.userManager = userManager;
            this.folkService = folkService;
            this.logger = logger;
        }

        public async Task CreateUser(CreateFolkDTO user)
        {
            IdentityResult? result = await userManager.CreateAsync(
                new IdentityUser() { UserName = user.Name, Email = user.Email },
                user.Password
            );
            if (!result.Succeeded)
            {
                List<string>? errors = result.Errors
                    .Select(e => e.Description.TrimEnd('.'))
                    .ToList();
                string detail = string.Join(", ", errors);
                throw new Exception($"Something went wrong: {detail}");
            }
        }

        public async Task DeleteUser(int id)
        {
            // id IS THE FOLK ID, USED TO FIND THE FOLK RECORD'S USERNAME
            FolkDTO? folkRecord = await folkService.GetFolk(id);
            if (folkRecord == null)
                return;

            IdentityUser? userRecord = await userManager.FindByNameAsync(folkRecord.Name);
            if (userRecord != null)
                await userManager.DeleteAsync(userRecord);
        }
    }
}
