using Travel.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Travel.Controllers.Components
{
    public class MobileMenuViewComponent : ViewComponent
    {
        private ITourCategoryService _TourCategoryService;

        public MobileMenuViewComponent(ITourCategoryService TourCategoryService)
        {
            _TourCategoryService = TourCategoryService;
        }

        public IViewComponentResult Invoke()
        {
            return View(_TourCategoryService.GetAll());
        }
    }
}
