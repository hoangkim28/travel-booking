using Travel.Application.Interfaces;
using Travel.Infrastructure.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

namespace Travel.Controllers.Components
{
    public class CategoryMenuViewComponent : ViewComponent
    {

        private ITourCategoryService _TourCategoryService;
        private IMemoryCache _memoryCache;
        public CategoryMenuViewComponent(ITourCategoryService TourCategoryService, IMemoryCache memoryCache)
        {
            _TourCategoryService = TourCategoryService;
            _memoryCache = memoryCache;
        }
        public IViewComponentResult Invoke()
        {
            // return View(_TourCategoryService.GetAll());
            var categories = _memoryCache.GetOrCreate(CacheKeys.TourCategories, entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromHours(2);
                return _TourCategoryService.GetAll();
            });
            return View(categories);
        }
    }
}
