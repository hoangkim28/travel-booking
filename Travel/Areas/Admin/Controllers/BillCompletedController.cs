using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Travel.Application.Interfaces;
using Travel.Authorization;
using Travel.Data.Enums;
using Travel.Data.IRepositories;

namespace Travel.Areas.Admin.Controllers
{
    public class BillCompletedController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IAuthorizationService _authorizationService;
        private readonly ITourRepository _TourRepository;
        private readonly IBillCompletedDetailRepository _orderDetailRepository;
        private readonly IBillCompletedService _billCompletedService;

        public BillCompletedController(IBillCompletedService billCompletedService,
            IWebHostEnvironment hostingEnvironment,
            IAuthorizationService authorizationService,
            ITourRepository tourRepository,
            IBillDetailRepository orderDetailRepository)
        {
            _authorizationService = authorizationService;
            _hostingEnvironment = hostingEnvironment;
            _authorizationService = authorizationService;
            _billCompletedService = billCompletedService;
        }
        public async Task<ActionResult> Index()
        {
            var result = await _authorizationService.AuthorizeAsync(User, "BILLCOMPLETED", Operations.Read);
            if (!result.Succeeded)
                return new RedirectResult("/Admin/Login/Index");
            return View();
        }
        [HttpGet]
        public IActionResult GetAllPaging(string startDate, string endDate, string keyword, int page, int pageSize)
        {
            var model = _billCompletedService.GetAllPaging(startDate, endDate, keyword, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _billCompletedService.GetDetail(id);

            return new OkObjectResult(model);
        }
    }
}
