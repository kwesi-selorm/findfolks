using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace API.Services
{
    public class AuthService
    {
        private readonly UserManager<IdentityUser> userManager;

        public AuthService(UserManager<IdentityUser> userManager)
        {
            this.userManager = userManager;
        }

        public async Task DeleteUser(int id)
        {
            IdentityUser? userRecord = await userManager.FindByIdAsync(id.ToString());

            // DELETE LOGIN INFO AND ROLES AND FINALLY DELETE THE USER
            if (userRecord != null)
            {
                IList<UserLoginInfo>? logins = await userManager.GetLoginsAsync(userRecord);
                foreach (UserLoginInfo login in logins)
                {
                    await userManager.RemoveLoginAsync(
                        userRecord,
                        login.LoginProvider,
                        login.ProviderKey
                    );
                }
                IList<string>? roles = await userManager.GetRolesAsync(userRecord);
                foreach (string role in roles)
                    await userManager.RemoveFromRoleAsync(userRecord, role);

                await userManager.DeleteAsync(userRecord);
            }
        }
    }
}
