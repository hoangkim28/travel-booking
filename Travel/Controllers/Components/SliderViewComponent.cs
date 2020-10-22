using Travel.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace Travel.Controllers.Components
{
    public class SliderViewComponent : ViewComponent
    {
        private ICommonService _commonService;
        public SliderViewComponent(ICommonService commonService)
        {
            _commonService = commonService;
        }
        public IViewComponentResult Invoke()
        {
            return View(_commonService.GetSlides("top"));
        }
    }
}
