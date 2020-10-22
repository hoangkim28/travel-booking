using Microsoft.Extensions.Configuration;
using Travel.Application.Interfaces;
using Travel.Models.TourViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using Travel.Data.Entities;
using Travel.Application.Implementation;
using Travel.Application.ViewModels.Tour;
using System.Collections.Generic;
using AutoMapper;

namespace Travel.Controllers
{
    public class TourController : Controller
    {
        private readonly ITourService _TourService;
        private readonly ITourCategoryService _TourCategoryService;
        private readonly IConfiguration _configuration;
        private readonly IBillService _billService;
        public IConfiguration Configuration => _configuration;

        public TourController(ITourService TourService, IConfiguration configuration,
            ITourCategoryService TourCategoryService, IBillService billService)
        {
            _TourService = TourService;
            _TourCategoryService = TourCategoryService;
            _configuration = configuration;
            _billService = billService;
        }
        [Route("tours.html", Name = "Index")]
        public IActionResult Index(List<TourViewModel> tour)
        {
            tour = _TourService.GetAll().OrderBy(x => x.DateModified).OrderByDescending(x => x.ViewCount).ToList();
            return View(tour);
        }
        [HttpGet]
        [Route("{alias}-c.{id}.html", Name = "Catalog")]
        public IActionResult Catalog(int id, int? pageSize, string sortBy, int page = 1)
        {
            var catalog = new CatalogViewModel();
            if (pageSize == null)
                pageSize = 5;

            catalog.PageSize = pageSize;
            catalog.SortType = sortBy;
            catalog.Data = _TourService.GetAllPagingHome(id, string.Empty, page, pageSize.Value);
            catalog.Categories = _TourCategoryService.GetByParentId();
            catalog.Category = _TourCategoryService.GetById(id);

            return View(catalog);
        }

        [HttpGet]
        [Route("collection.html", Name = "Collection")]
        public IActionResult Collections(string t, int? pageSize, string sortBy, int page = 1)
        {
            var catalog = new CollectionViewModel();
            if (pageSize == null)
                pageSize = 5;
            catalog.PageSize = pageSize;
            catalog.SortType = sortBy;
            catalog.Data = _TourService.GetCollection(t, page, pageSize.Value);
            catalog.Categories = _TourCategoryService.GetByParentId();

            return View(catalog);
        }

        [HttpGet]
        [Route("{alias}-p.{id}.html", Name = "Detail")]
        public IActionResult Details(int id)
        {
            // thêm lượt xem
            _TourService.IncermentViewCount(id);

            var model = new DetailViewModel();
            model.Tour = _TourService.GetById(id);
            model.Category = _TourCategoryService.GetById(model.Tour.CategoryId);
            model.RelatedTours = _TourService.GetRelatedTours(id, 10);
            model.UpsellTours = _TourService.GetUpsellTours(10);
            model.TourImages = _TourService.GetImages(id);
            model.Tags = _TourService.GetTourTags(id);
            
            if (model.Tour.Status == Data.Enums.Status.InActive)
                return new RedirectResult("khong-tim-thay.html");
            else
                return View(model);
        }


        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _TourService.GetById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetTourTagById(int id)
        {
            var model = _TourService.GetTourTags(id);
            return new OkObjectResult(model);
        }


        [Route("tim-kiem.html")]
        public IActionResult Search(int? id, string keyword, int page, int? pageSize)
        {
            page = 1;
            var catalog = new SearchResultViewModel();
            if (pageSize == null)
                pageSize = 5;
            catalog.PageSize = pageSize;
            catalog.Data = _TourService.GetAllPaging(null, keyword, page, pageSize.Value);
            catalog.Categories = _TourCategoryService.GetByParentId();
            catalog.Keyword = keyword;
            ViewData["keyword"] = keyword;
            return View(catalog);
        }

        [Route("khong-tim-thay.html")]
        [HttpGet]
        public IActionResult InActivePage()
        {
            return View();
        }
    }
}