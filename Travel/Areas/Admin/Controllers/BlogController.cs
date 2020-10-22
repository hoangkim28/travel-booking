using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Blog;
using Travel.Authorization;
using Travel.Infrastructure.Interfaces;
using Travel.Utilities.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Areas.Admin.Controllers
{
    public class BlogController : BaseController
    {
        private readonly IBlogService _blogService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IAuthorizationService _authorizationService;
        public BlogController(IBlogService blogService, IUnitOfWork unitOfWork, IHostingEnvironment hostingEnvironment, IAuthorizationService authorizationService)
        {
            _blogService = blogService;
            _unitOfWork = unitOfWork;
            _hostingEnvironment = hostingEnvironment;
            _authorizationService = authorizationService;
        }
        public async Task<IActionResult> Index()
        {
            var result = await _authorizationService.AuthorizeAsync(User, "BLOG", Operations.Read);
            if (!result.Succeeded)
                return new RedirectResult("/Admin/Login/Index");
            return View();
        }

        #region AJAX API

        [HttpGet]
        public IActionResult GetAll()
        {
            var model = _blogService.GetAll();
            return new ObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int pageSize, int page)
        {
            var model = _blogService.GetAllPaging(keyword, pageSize, page);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _blogService.GetById(id);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> SaveEntity(BlogViewModel blogVm)
        {
            var canCreate = await _authorizationService.AuthorizeAsync(User, "BLOG", Operations.Create);
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "BLOG", Operations.Update);

            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                blogVm.SeoAlias = TextHelper.ToUnsignString(blogVm.Name).ToLower();
                if (blogVm.Id == 0 && canCreate.Succeeded)
                {
                    blogVm.DateCreated = DateTime.Now;
                    _blogService.Add(blogVm);
                    _blogService.Save();
                }
                else
                {
                    if (canUpdate.Succeeded)
                    {
                        blogVm.DateModified = DateTime.Now;
                        _blogService.Update(blogVm);
                        _blogService.Save();
                    }
                    else
                    {
                        IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                        return new BadRequestObjectResult(allErrors);
                    }
                }
                return new OkObjectResult(blogVm);
            }
        }
        #endregion AJAX API
    }
}