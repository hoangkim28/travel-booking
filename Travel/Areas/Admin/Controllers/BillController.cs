using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Common;
using Travel.Application.ViewModels.Tour;
using Travel.Authorization;
using Travel.Data.Enums;
using Travel.Utilities.Extensions;
using Travel.Utilities.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using OfficeOpenXml;
using Travel.Data.IRepositories;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Logical;
using AutoMapper;
using Travel.Data.Entities;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Travel.Models;

namespace Travel.Areas.Admin.Controllers
{
    public class BillController : BaseController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IBillService _billService;
        private readonly IBillCompletedService _billCompletedService;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IAuthorizationService _authorizationService;
        private readonly ITourRepository _TourRepository;
        private readonly IBillDetailRepository _orderDetailRepository;
        private readonly IBillCompletedRepository _orderCompletedRepository;
        private readonly IBillCompletedDetailRepository _orderCompletedDetailRepository;
        private readonly IBillRepository _orderRepository;
        public BillController(IBillService billService,
            IWebHostEnvironment hostingEnvironment,
            IAuthorizationService authorizationService,
            ITourRepository tourRepository,
            IBillDetailRepository orderDetailRepository,
            IBillCompletedRepository orderCompletedRepository,
            IBillRepository orderRepository,
            IBillCompletedDetailRepository orderCompletedDetailRepository,
            IBillCompletedService billCompletedService,
            UserManager<AppUser> userManager)
        {
            _billService = billService;
            _hostingEnvironment = hostingEnvironment;
            _authorizationService = authorizationService;
            _TourRepository = tourRepository;
            _orderDetailRepository = orderDetailRepository;
            _orderCompletedRepository = orderCompletedRepository;
            _orderCompletedDetailRepository = orderCompletedDetailRepository;
            _orderRepository = orderRepository;
            _billCompletedService = billCompletedService;
            _userManager = userManager;
        }

        public async Task<IActionResult> Index()
        {
            var result = await _authorizationService.AuthorizeAsync(User, "BILL", Operations.Read);
            if (!result.Succeeded)
                return new RedirectResult("/Admin/Login/Index");
            return View();
        }

        public async Task<IActionResult> Final()
        {
            var result = await _authorizationService.AuthorizeAsync(User, "BILL", Operations.Read);
            if (!result.Succeeded)
                return new RedirectResult("/Admin/Login/Index");
            return new RedirectResult("/Admin/BillCompleted/Index");
        }
        [HttpGet]
        public IActionResult pdf(int id)
        {
            var model = _billService.GetDetail(id);
            return View(model);
        }

        [HttpGet]
        public IActionResult GetById(int id)
        {
            var model = _billService.GetDetail(id);

            return new OkObjectResult(model);
        }
        [HttpGet]
        public IActionResult UpdateStatus(int billId, BillStatus status)
        {
            _billService.UpdateStatus(billId, status);
            return new OkResult();
        }
        [HttpPost]
        public IActionResult CancelBill(int billId)
        {
            _billService.CancelBill(billId);
            _billService.Save();
            return new OkResult();
        }
        public void UpdateSeatAvaliable(int id, int qty)
        {
            var Tour = _TourRepository.FindById(id);
            Tour.SeatAvailability -= qty;
            _TourRepository.Update(Tour);
        }
        public bool CheckSeatAvaliable(int id, int qty)
        {
            var Tour = _TourRepository.FindById(id);
            if (Tour.SeatAvailability >= qty)
                return true;
            else
                return false;
        }

        [HttpPost]
        public async Task<IActionResult> ConfirmBill(int billId)
        {
            var order = _orderRepository.FindById(billId);
            var orderDetails = _orderDetailRepository.FindAll().Where(x => x.BillId == billId).ToList();
            foreach (var detail in orderDetails)
            {
                if (CheckSeatAvaliable(detail.TourId, detail.Quantity)==true)
                {
                    UpdateSeatAvaliable(detail.TourId, detail.Quantity);
                }
            }
            _billService.ConfirmBill(billId);
            _billService.Save();

            var billDetail = new List<BillCompletedDetailViewModel>();
            foreach (var item in order.BillDetails)
            {
                billDetail.Add(new BillCompletedDetailViewModel()
                {
                    Price = item.Price,
                    Quantity = item.Quantity,
                    TourId = item.Tour.Id,
                    BillId = billId
                });
            }
            var user = await GetCurrentUserAsync();

            var userId = user?.Id;

            var bill = new BillCompletedViewModel()
            {
                CustomerMobile = order.CustomerMobile,
                CustomerAddress = order.CustomerAddress,
                CustomerName = order.CustomerName,
                CustomerMessage = order.CustomerMessage,
                CustomerEmail = order.CustomerEmail,
                CustomerId = order.CustomerId,
                PaymentMethod = order.PaymentMethod,
                BillCompletedDetails = billDetail,
                UserId = userId,
                OrderId = order.Id
            };
            _billCompletedService.Create(bill);
            _billCompletedService.Save();

            return Ok();
        }
        [HttpGet]
        public IActionResult GetAllPaging(BillStatus status, string startDate, string endDate, string keyword, int page, int pageSize)
        {
            var model = _billService.GetAllPaging(status,startDate, endDate, keyword, page, pageSize);
            return new OkObjectResult(model);
        }
        [HttpGet]
        public IActionResult GetAllPagingFinal(BillStatus status, string startDate, string endDate, string keyword, int page, int pageSize)
        {
            status = BillStatus.Completed;
            var model = _billService.GetAllPaging(status, startDate, endDate, keyword, page, pageSize);
            return new OkObjectResult(model);
        }
        [HttpPost]
        public async Task<IActionResult> SaveEntity(BillViewModel billVm)
        {
            var canCreate = await _authorizationService.AuthorizeAsync(User, "BILL", Operations.Create);
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "BILL", Operations.Update);

            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            if (billVm.Id == 0 && canCreate.Succeeded)
            {
                if (billVm.CustomerMessage == null)
                {
                    billVm.CustomerMessage = "";
                }
                _billService.Create(billVm);
                _billService.Save();
                return new OkObjectResult(billVm);
            }
            else
            {
                if (canUpdate.Succeeded)
                {
                    if (billVm.CustomerMessage == null)
                    {
                        billVm.CustomerMessage = "";
                    }
                    _billService.Update(billVm);
                    _billService.Save();
                    return new OkObjectResult(billVm);
                }
                else
                {
                    IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    return new BadRequestObjectResult(allErrors);
                }
            }
        }
        [HttpGet]
        public IActionResult GetPaymentMethod()
        {
            List<EnumModel> enums = ((PaymentMethod[])Enum.GetValues(typeof(PaymentMethod)))
                .Select(c => new EnumModel()
                {
                    Value = (int)c,
                    Name = c.GetDescription()
                }).ToList();
            return new OkObjectResult(enums);
        }

        [HttpGet]
        public IActionResult GetPaymentMethodBill(int billId)
        {
            var model = _billService.GetPaymentMethodBill(billId);
            return Json(model);
        }

        [HttpGet]
        public IActionResult GetBillStatus()
        {
            List<EnumModel> enums = ((BillStatus[])Enum.GetValues(typeof(BillStatus)))
                .Select(c => new EnumModel()
                {
                    Value = (int)c,
                    Name = c.GetDescription()
                }).ToList();
            return new OkObjectResult(enums);
        }

        [HttpPost]
        public IActionResult ExportExcel(int billId)
        {
            string sWebRootFolder = _hostingEnvironment.WebRootPath;
            string sFileName = $"Bill_{billId}.xlsx";
            // Template File
            string templateDocument = Path.Combine(sWebRootFolder, "templates", "BillTemplate.xlsx");

            string url = $"{Request.Scheme}://{Request.Host}/{"export-files"}/{sFileName}";
            FileInfo file = new FileInfo(Path.Combine(sWebRootFolder, "export-files", sFileName));
            if (file.Exists)
            {
                file.Delete();
                file = new FileInfo(Path.Combine(sWebRootFolder, sFileName));
            }
            using (FileStream templateDocumentStream = System.IO.File.OpenRead(templateDocument))
            {
                using (ExcelPackage package = new ExcelPackage(templateDocumentStream))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0]; // Sheet đầu tiên
                    var billDetail = _billService.GetDetail(billId);
                    worksheet.Cells[4, 1].Value = "Khách hàng: " + billDetail.CustomerName;
                    worksheet.Cells[5, 1].Value = "Địa chỉ: " + billDetail.CustomerAddress;
                    worksheet.Cells[6, 1].Value = "Điện thoại: 0" + billDetail.CustomerMobile;
                    int rowIndex = 9;
                    var orderDetails = _billService.GetBillDetails(billId);
                    int count = 1;
                    foreach (var orderDetail in orderDetails)
                    {
                        worksheet.Cells[rowIndex, 1].Value = count.ToString();
                        worksheet.Cells[rowIndex, 2].Value = orderDetail.Tour;
                        worksheet.Cells[rowIndex, 3].Value = orderDetail.Quantity.ToString();
                        worksheet.Cells[rowIndex, 4].Value = orderDetail.Price.ToString("N0");
                        worksheet.Cells[rowIndex, 5].Value = (orderDetail.Price * orderDetail.Quantity).ToString("N0");
                        rowIndex++;
                        count++;
                    }
                    decimal total = (decimal)(orderDetails.Sum(x => x.Quantity * x.Price));
                    worksheet.Cells[24, 5].Value = total.ToString("N0");

                    var numberWord = "Tổng số tiền (bằng chữ): " + TextHelper.ToString(total);
                    worksheet.Cells[26, 1].Value = numberWord.ToUpperInvariant();
                    var billDate = billDetail.DateCreated;
                    worksheet.Cells[28, 3].Value = billDate.Day + ", " + billDate.Month + ", " + billDate.Year;


                    package.SaveAs(file); //Save the workbook.
                }
            }
            return new OkObjectResult(url);
        }
        private async Task<AppUser> GetCurrentUserAsync()
        {
            return await _userManager.GetUserAsync(HttpContext.User);
        }
    }
}