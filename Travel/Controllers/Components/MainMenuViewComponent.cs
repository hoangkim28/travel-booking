using Travel.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;

namespace Travel.Controllers.Components
{
    public class MainMenuViewComponent : ViewComponent
    {
        private ITourCategoryService _TourCategoryService;

        public MainMenuViewComponent(ITourCategoryService TourCategoryService)
        {
            _TourCategoryService = TourCategoryService;
        }

        public IViewComponentResult Invoke()
        {
            return View(_TourCategoryService.GetHomeCategories(10).ToList());
        }
    }
}
