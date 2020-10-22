using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Tour;
using Travel.Authorization;
using Travel.Utilities.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Areas.Admin.Controllers
{
    public class TourCategoryController : BaseController
    {
        private readonly ITourCategoryService _TourCategoryService;
        private readonly IAuthorizationService _authorizationService;

        public TourCategoryController(ITourCategoryService TourCategoryService, IAuthorizationService authorizationService)
        {
            _TourCategoryService = TourCategoryService;
            _authorizationService = authorizationService;
        }

        public async Task<IActionResult> Index()
        {
            var result = await _authorizationService.AuthorizeAsync(User, "Tour_CATEGORY", Operations.Read);
            if (!result.Succeeded)
                return new RedirectResult("/Admin/Login/Index");
            return View();
        }

        #region Get Data API

        [HttpGet]
        public IActionResult GetAll()
        {
            var model = _TourCategoryService.GetAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(int? categoryId, string keyword, int page, int pageSize)
        {
            var model = _TourCategoryService.GetAllPaging(categoryId, keyword, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllCategories()
        {
            var model = _TourCategoryService.GetAll();
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _TourCategoryService.GetById(id);

            return new ObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> SaveEntity(TourCategoryViewModel TourVm)
        {
            var canCreate = await _authorizationService.AuthorizeAsync(User, "Tour_CATEGORY", Operations.Create);
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "Tour_CATEGORY", Operations.Update);
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                TourVm.SeoAlias = TextHelper.ToUnsignString(TourVm.Name).ToLower();
                if (TourVm.SeoPageTitle == null)
                    TourVm.SeoPageTitle = TourVm.Name;
                TourVm.DateCreated = DateTime.Now;
                if (TourVm.Id == 0 && canCreate.Succeeded == true)
                {
                    _TourCategoryService.Add(TourVm);
                    _TourCategoryService.Save();
                }
                else
                {
                    if (canUpdate.Succeeded == true)
                    {
                        TourVm.DateModified = DateTime.Now;
                        _TourCategoryService.Update(TourVm);
                        _TourCategoryService.Save();
                    }
                    return new OkObjectResult(TourVm);
                }
            }
            return new OkObjectResult(TourVm);
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            if (id == 0)
            {
                return new BadRequestResult();
            }
            else
            {
                _TourCategoryService.Delete(id);
                _TourCategoryService.Save();
                return new OkObjectResult(id);
            }
        }

        [HttpPost]
        public IActionResult UpdateParentId(int sourceId, int targetId, Dictionary<int, int> items)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }
            else
            {
                _TourCategoryService.UpdateParentId(sourceId, targetId, items);
                _TourCategoryService.Save();
                return new OkResult();
            }
        }

        [HttpPost]
        public IActionResult ReOrder(int sourceId, int targetId)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }
            else
            {
                if (sourceId == targetId)
                {
                    return new BadRequestResult();
                }
                else
                {
                    _TourCategoryService.ReOrder(sourceId, targetId);
                    _TourCategoryService.Save();
                    return new OkResult();
                }
            }
        }

        #endregion Get Data API
    }
}