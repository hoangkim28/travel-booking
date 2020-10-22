using Travel.Application.Interfaces;
using Travel.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Travel.Controllers
{
    public class HomeController : Controller
    {
        private ITourService _TourService;
        private ITourCategoryService _TourCategoryService;

        private IBlogService _blogService;
        private ICommonService _commonService;

        public HomeController(ITourService TourService,
        IBlogService blogService, ICommonService commonService,
       ITourCategoryService TourCategoryService)
        {
            _blogService = blogService;
            _commonService = commonService;
            _TourService = TourService;
            _TourCategoryService = TourCategoryService;
        }

        [ResponseCache(CacheProfileName = "Default")]
        public IActionResult Index()
        {
            var homeVm = new HomeViewModel();
            homeVm.HomeCategories = _TourCategoryService.GetHomeCategories(12);
            homeVm.HotTours = _TourService.GetHotTour(6);
            homeVm.HotToursForBoy = _TourService.HotToursForBoy(12);
            homeVm.HotToursForGirl = _TourService.HotToursForGirl(12);
            homeVm.HotToursForMan = _TourService.HotToursForMan(12);
            homeVm.HotToursForWomen = _TourService.HotToursForWomen(12);
            homeVm.TopSellTours = _TourService.GetLastest(6);
            homeVm.LastestBlogs = _blogService.GetLastest(6);
            homeVm.HomeSlides = _commonService.GetSlides("top");
            homeVm.CategoryByParentId = _TourCategoryService.GetByParentId();
            homeVm.Title = "Trang chủ";
            homeVm.MetaDescription = "Trang chủ shop Travelista";
            homeVm.MetaKeyword = "Đặt tour nhanh nhất, tour rẻ nhất";
            return View(homeVm);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}