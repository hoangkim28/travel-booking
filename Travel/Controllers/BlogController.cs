using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Blog;
using Travel.Utilities.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Travel.Controllers
{
    public class BlogController : Controller
    {
        private readonly IBlogService _blogService;
        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }
        [HttpGet]
        public IActionResult Index(string keyword, int Pagesize, int page)
        {
            var model = new PagedResult<BlogViewModel>();
            model = _blogService.GetAllPaging(keyword, Pagesize, page);
            return Json(model);
        }
        [HttpGet]
        [Route("blog/{alias}-{id}.html", Name = "BlogDetail")]
        public IActionResult Details(int id)
        {
            BlogViewModel model = _blogService.GetById(id);
            return View(model);
        }
    }
}