using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Travel.Controllers.Components
{
    public class BrandViewComponent : ViewComponent
    {
        public IViewComponentResult Invoke()
        {
            return View();
        }
    }
}
