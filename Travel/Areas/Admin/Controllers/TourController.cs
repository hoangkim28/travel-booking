using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Tour;
using Travel.Authorization;
using Travel.Utilities.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using OfficeOpenXml;
using OfficeOpenXml.Table;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Travel.Data.Entities;

namespace Travel.Areas.Admin.Controllers
{
    public class TourController : BaseController
    {
        private readonly ITourService _TourService;
        private readonly ITourCategoryService _TourCategoryService;
        private readonly ITourPlaceService _tourPlaceService;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IAuthorizationService _authorizationService;

        public TourController(ITourService TourService,
            ITourCategoryService TourCategoryService,
            ITourPlaceService tourPlaceService,
            IHostingEnvironment hostingEnvironment,
            IAuthorizationService authorizationService)
        {
            _TourService = TourService;
            _TourCategoryService = TourCategoryService;
            _tourPlaceService = tourPlaceService;
            _hostingEnvironment = hostingEnvironment;
            _authorizationService = authorizationService;
        }

        public async Task<IActionResult> Index()
        {
            var result = await _authorizationService.AuthorizeAsync(User, "TOUR_LIST", Operations.Read);
            if (!result.Succeeded)
                return new RedirectResult("/Admin/Login/Index");
            return View();
        }

        #region AJAX API

        [HttpGet]
        public IActionResult GetAll()
        {
            var model = _TourService.GetAll();
            return new ObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(int? categoryId, string keyword, int page, int pageSize)
        {
            var model = _TourService.GetAllPaging(categoryId, keyword, page, pageSize);
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
            var model = _TourService.GetById(id);
            model.TourPlace = _tourPlaceService.GetAllByTourId(id);
            return new OkObjectResult(model);
        }

        // Kiễm tra id nếu có thì sủa theo id, không thì thêm mới.
        [HttpPost]
        public async Task<IActionResult> SaveEntity(TourViewModel TourVm)
        {
            var canCreate = await _authorizationService.AuthorizeAsync(User, "TOUR_LIST", Operations.Create);
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "TOUR_LIST", Operations.Update);

            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                TourVm.SeoAlias = TextHelper.ToUnsignString(TourVm.Name).ToLower();
                if (TourVm.Id == 0 && canCreate.Succeeded)
                {
                    TourVm.DateCreated = DateTime.Now;
                    _TourService.Add(TourVm);
                    _TourService.Save();
                }
                else if (canUpdate.Succeeded)
                {
                    TourVm.DateModified = DateTime.Now;
                    TourVm.ViewCount = TourVm.ViewCount;
                    TourVm.Like = TourVm.Like;
                    TourVm.DateCreated = TourVm.DateCreated;
                    _TourService.Update(TourVm);
                    _TourService.Save();
                }
                else
                {
                    IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    return new BadRequestObjectResult(allErrors);
                }
            }
            return new OkObjectResult(TourVm);
        }

        [HttpPost]
        public async Task<IActionResult> ChangStatusAsync(int id)
        {
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "TOUR_LIST", Operations.Update);
            if (canUpdate.Succeeded)
                if (_TourService.ChangeStatus(id)) return new OkObjectResult(id);
                else return new BadRequestObjectResult(ModelState);
            else return new BadRequestObjectResult(ModelState);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            var canDelete = await _authorizationService.AuthorizeAsync(User, "TOUR_LIST", Operations.Delete);

            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }
            else
            {
                if (canDelete.Succeeded)
                {
                    if (_TourService.CheckTourInBill(id))
                    {
                        _TourService.Delete(id);
                        _TourService.Save();
                        return new OkObjectResult(id);
                    }
                    else
                        return new BadRequestObjectResult(ModelState);
                }
                else return new BadRequestObjectResult(ModelState);
            }
        }

        // Import Tour via Excel
        [HttpPost]
        public async Task<IActionResult> ImportExcelAsync(IList<IFormFile> files, int categoryId)
        {
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "TOUR_LIST", Operations.Update);
            if (canUpdate.Succeeded)
            {
                if (files != null && files.Count > 0)
                {
                    var file = files[0];
                    var filename = ContentDispositionHeaderValue
                                       .Parse(file.ContentDisposition)
                                       .FileName
                                       .Trim('"');

                    string folder = _hostingEnvironment.WebRootPath + $@"\uploaded\excels";
                    if (!Directory.Exists(folder))
                    {
                        Directory.CreateDirectory(folder);
                    }
                    string filePath = Path.Combine(folder, filename);

                    using (FileStream fs = System.IO.File.Create(filePath))
                    {
                        file.CopyTo(fs);
                        fs.Flush();
                    }
                    _TourService.ImportExcel(filePath, categoryId);
                    _TourService.Save();
                    return new OkObjectResult(filePath);
                }
                return new NoContentResult();
            }
            else return new BadRequestObjectResult(ModelState);
        }

        // Export to Excel
        [HttpPost]
        public IActionResult ExportExcel(int? categoryId, string keyword, int page, int pageSize)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string directory = Path.Combine(sWebRootFolder, "export-files");
            if (!Directory.Exists(directory))
            {
                Directory.CreateDirectory(directory);
            }
            string sFileName = $"Tour_{DateTime.Now:yyyyMMddhhmmss}.xlsx";
            string fileUrl = $"{Request.Scheme}://{Request.Host}/export-files/{sFileName}";
            FileInfo file = new FileInfo(Path.Combine(directory, sFileName));
            if (file.Exists)
            {
                file.Delete();
                file = new FileInfo(Path.Combine(sWebRootFolder, sFileName));
            }
            var Tours = _TourService.GetListToExport(categoryId, keyword, page, pageSize);
            using (ExcelPackage package = new ExcelPackage(file))
            {
                // add a new worksheet to the empty workbook
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add("Tours");
                worksheet.Cells["A1"].LoadFromCollection(Tours, true, TableStyles.Light1);
                worksheet.Cells.AutoFitColumns();
                package.Save(); //Save the workbook.
            }
            return new OkObjectResult(fileUrl);
        }



        [HttpPost]
        public async Task<IActionResult> SaveImagesAsync(int TourId, string[] images)
        {
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "TOUR_LIST", Operations.Update);
            if (canUpdate.Succeeded)
            {
                _TourService.AddImages(TourId, images);
                _TourService.Save();
                return new OkObjectResult(images);
            }
            else return new BadRequestObjectResult(ModelState);
        }

        [HttpGet]
        public IActionResult GetImages(int TourId)
        {
            var images = _TourService.GetImages(TourId);
            return new OkObjectResult(images);
        }
        #endregion AJAX API
    }
}