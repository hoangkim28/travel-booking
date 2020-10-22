using Travel.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Travel.Helpers
{
    public class CustomClaimsPrincipalFactory : UserClaimsPrincipalFactory<AppUser, AppRole>
    {
        private UserManager<AppUser> _userManager;

        public CustomClaimsPrincipalFactory(UserManager<AppUser> userManager, RoleManager<AppRole> roleManager, IOptions<IdentityOptions> options) : base(userManager, roleManager, options)
        {
            _userManager = userManager;
        }

        //Ghi đè phương thức CreateAsync để khi đăng nhập sẽ tự app claim này vào.
        public async override Task<ClaimsPrincipal> CreateAsync(AppUser appUser)
        {
            var pricipal = await base.CreateAsync(appUser);
            var roles = await _userManager.GetRolesAsync(appUser);
            ((ClaimsIdentity)pricipal.Identity).AddClaims(new[]
            {
                new Claim("Email",appUser.Email),
                new Claim("FullName", appUser.FullName??string.Empty),
                new Claim("Avatar", appUser.Avatar??string.Empty),
                new Claim("Roles",string.Join(";",roles)),
                new Claim("UserId",appUser.Id.ToString())
            });
            return pricipal;
        }
    }
}