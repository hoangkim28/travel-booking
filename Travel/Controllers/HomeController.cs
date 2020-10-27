using Travel.Application.Interfaces;
using Travel.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using AutoMapper;
using Travel.Application.ViewModels.Tour;

namespace Travel.Controllers
{
    public class HomeController : Controller
    {
        private ITourService _TourService;
        private ITourCategoryService _TourCategoryService;
        private readonly IMapper _mapper;
        private IBlogService _blogService;
        private ICommonService _commonService;

        public HomeController(ITourService TourService,
        IBlogService blogService, ICommonService commonService,
       ITourCategoryService TourCategoryService, IMapper mapper)
        {
            _blogService = blogService;
            _commonService = commonService;
            _TourService = TourService;
            _TourCategoryService = TourCategoryService;
            _mapper = mapper;
        }

        [ResponseCache(CacheProfileName = "Default")]
        public IActionResult Index()
        {
            var homeVm = new HomeViewModel();
            homeVm.HomeCategories = _TourCategoryService.GetHomeCategories();
            homeVm.HotTours = _TourService.GetHotTour(6);
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