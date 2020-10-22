using System.Linq;
using System.Security.Claims;

namespace Travel.Extensions
{
    public static class IdentityExtensions
    {
        public static string GetSpecifiClaim(this ClaimsPrincipal claimsPrincipal, string claimType)
        {
            var claim = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == claimType);
            return (claim != null) ? claim.Value : string.Empty;
        }
    }
}