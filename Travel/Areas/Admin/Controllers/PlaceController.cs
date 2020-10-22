using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Tour;

namespace Travel.Areas.Admin.Controllers
{
    public class PlaceController : BaseController
    {
        private IPlaceService _placeService;

        public PlaceController(IPlaceService placeService)
        {
            _placeService = placeService;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public IActionResult SaveEntity(PlaceViewModel placeVm)
        {
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            if (placeVm.Id == 0)
            {
                _placeService.Create(placeVm);
            }
            else
            {
                _placeService.Update(placeVm);
            }
            _placeService.Save();
            return new OkObjectResult(placeVm);
        }
        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _placeService.GetById(id);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var model = _placeService.GetAll().Where(x => x.Status == Data.Enums.Status.Active);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int page, int pageSize)
        {
            var model = _placeService.GetAllPaging(keyword, page, pageSize);
            return new OkObjectResult(model);
        }
        public IActionResult Delete(int id)
        {
            _placeService.Delete(id);
            return new OkObjectResult("Ok");
        }
    }
}