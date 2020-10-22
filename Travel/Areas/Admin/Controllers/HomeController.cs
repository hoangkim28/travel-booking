using Travel.Application.Dapper.Interfaces;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Enums;
using Travel.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Linq;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;

namespace Travel.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize]
    public class HomeController : Controller
    {
        private readonly IBillService _billService;
        private readonly IReportService _reportService;
        private readonly ITourService _tourService;

        public HomeController(IReportService reportService, IBillService billService, ITourService tourService)
        {
            _billService = billService;
            _reportService = reportService;
            _tourService = tourService;
        }
        public IActionResult Index(HomeReportViewModel model)
        {
            ViewData["Title"] = "Dashboard";
            model.NewBillCount = _billService.GetTotalByBillStatus(BillStatus.New);
            model.InProgressBillCount = _billService.GetTotalByBillStatus(BillStatus.InProgress);
            model.NewBill = _billService.GetAll().OrderByDescending(x => x.Id).Where(x => x.BillStatus == BillStatus.New).ToList();
            model.Tour = _tourService.GetAll().OrderByDescending(x => x.SeatAvailability).Take(5).ToList();
            return View(model);
        }

        public async Task<IActionResult> GetRevenue(string fromDate, string toDate)
        {
            //fromDate = "01/04/2018";
            //toDate = "11/12/2020";
            return new OkObjectResult(await _reportService.GetReportAsync(fromDate, toDate));
        }
    }
}