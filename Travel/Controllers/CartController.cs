using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Enums;
using Travel.Extensions;
using Travel.Models;
using Travel.Services;
using Travel.Utilities.Constants;

namespace Travel.Controllers
{
    public class CartController : Controller
    {
        ITourService _TourService;
        IBillService _billService;
        IViewRenderService _viewRenderService;
        IConfiguration _configuration;
        IEmailSender _emailSender;

        public CartController(ITourService TourService,
            IViewRenderService viewRenderService, IEmailSender emailSender,
            IConfiguration configuration, IBillService billService)
        {
            _TourService = TourService;
            _billService = billService;
            _viewRenderService = viewRenderService;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        [Route("cart.html", Name = "Cart")]
        public IActionResult Index()
        {
            return View();
        }

        [Route("checkout.html", Name = "Checkout")]
        [HttpGet]
        [Authorize]
        public IActionResult Checkout()
        {
            var model = new CheckoutViewModel();
            var session = HttpContext.Session.Get<List<ShoppingCartViewModel>>(CommonConstants.CartSession);
            if (session == null)
            {
                return Redirect("/cart.html");
            }
            else
            {
                model.Carts = session;
                return View(model);
            }

        }

        [Route("checkout.html", Name = "Checkout")]
        [ValidateAntiForgeryToken]
        [HttpPost]
        public async Task<IActionResult> Checkout(CheckoutViewModel model)
        {
            var session = HttpContext.Session.Get<List<ShoppingCartViewModel>>(CommonConstants.CartSession);

            if (ModelState.IsValid)
            {
                if (session != null)
                {
                    var details = new List<BillDetailViewModel>();
                    foreach (var item in session)
                    {
                        details.Add(new BillDetailViewModel()
                        {
                            Tour = item.Tour,
                            Price = item.Price,
                            Quantity = item.Quantity,
                            TourId = item.Tour.Id,

                        });
                    }
                    if (model.CustomerMessage == null)
                    {
                        model.CustomerMessage = "";
                    }
                    var billViewModel = new BillViewModel()
                    {
                        CustomerMobile = model.CustomerMobile,
                        BillStatus = BillStatus.New,
                        CustomerAddress = model.CustomerAddress,
                        CustomerName = model.CustomerName,
                        CustomerMessage = model.CustomerMessage,
                        CustomerEmail = model.CustomerEmail,
                        CustomerId = model.CustomerId,
                        BillDetails = details
                    };
                    _billService.Create(billViewModel);
                    _billService.Save();
                    model.BillDetails = billViewModel.BillDetails;
                    try
                    {
                        var content = await _viewRenderService.RenderToStringAsync("Cart/_BillMail", model);
                        //Send mail
                        await _emailSender.SendEmailAsync(model.CustomerEmail, "travelista.com.vn - Đặt Tour", content);
                        ViewData["Success"] = true;
                        HttpContext.Session.Remove(CommonConstants.CartSession);
                        return Redirect("/");
                    }
                    catch (Exception ex)
                    {
                        ViewData["Success"] = false;
                        ModelState.AddModelError("", ex.Message);
                    }

                }
            }
            model.Carts = session;
            return View(model);
        }

        [HttpGet]
        [Route("don-hang-{id}.html", Name = "CartDetail")]
        public IActionResult Details(int id)
        {
            var model = _billService.GetDetail(id);
            if (model.Id == 0)
            {
                return Redirect("/");
            }
            return View(model);
        }

        #region AJAX Request
        /// <summary>
        /// Get list item
        /// </summary>
        /// <returns></returns>
        public IActionResult GetCart()
        {
            var session = HttpContext.Session.Get<List<ShoppingCartViewModel>>(CommonConstants.CartSession);
            if (session == null)
                session = new List<ShoppingCartViewModel>();
            return new OkObjectResult(session);
        }

        /// <summary>
        /// Remove all Tours in cart
        /// </summary>
        /// <returns></returns>
        public IActionResult ClearCart()
        {
            HttpContext.Session.Remove(CommonConstants.CartSession);
            return Json(new { success = true, responseText = "Xóa thành công!" });
        }

        /// <summary>
        /// Add Tour to cart
        /// </summary>
        /// <param name="TourId"></param>
        /// <param name="quantity"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult AddToCart(int TourId, int quantity)
        {
            //Get Tour detail
            var Tour = _TourService.GetById(TourId);
            decimal Price = 0;
            if (Tour.PromotionPrice == null || Tour.PromotionPrice == 0)
            {
                Price = Tour.Price;
            }
            else
            {
                Price = Tour.PromotionPrice.Value;
            }
            if (_TourService.CheckSeatAvaliable(TourId, quantity))
            {
                //Get session with item list from cart
                var session = HttpContext.Session.Get<List<ShoppingCartViewModel>>(CommonConstants.CartSession);
                if (session != null)
                {
                    //Convert string to list object
                    bool hasChanged = false;

                    //Check exist with item Tour id
                    if (session.Any(x => x.Tour.Id == TourId))
                    {
                        foreach (var item in session)
                        {
                            //Update quantity for Tour if match Tour id
                            if (item.Tour.Id == TourId)
                            {
                                item.Quantity += quantity;
                                item.Price = Price;
                                hasChanged = true;
                            }
                        }
                    }
                    else
                    {
                        session.Add(new ShoppingCartViewModel()
                        {
                            Tour = Tour,
                            Quantity = quantity,
                            Price = Price
                        });
                        hasChanged = true;
                    }

                    //Update back to cart
                    if (hasChanged)
                    {
                        HttpContext.Session.Set(CommonConstants.CartSession, session);
                    }
                }
                else
                {
                    //Add new cart
                    var cart = new List<ShoppingCartViewModel>();
                    cart.Add(new ShoppingCartViewModel()
                    {
                        Tour = Tour,
                        Quantity = quantity,
                        Price = Price
                    });
                    HttpContext.Session.Set(CommonConstants.CartSession, cart);
                }
                return Json(new { success = true, responseText = "Đã thêm!" });
            }
            else
            {
                return Json(new { success = false, responseText = "Lỗi!" });

            }
        }

        /// <summary>
        /// Remove a Tour
        /// </summary>
        /// <param name="TourId"></param>
        /// <returns></returns>
        public IActionResult RemoveFromCart(int TourId)
        {
            var session = HttpContext.Session.Get<List<ShoppingCartViewModel>>(CommonConstants.CartSession);
            if (session != null)
            {
                bool hasChanged = false;
                foreach (var item in session)
                {
                    if (item.Tour.Id == TourId)
                    {
                        session.Remove(item);
                        hasChanged = true;
                        break;
                    }
                }
                if (hasChanged)
                {
                    HttpContext.Session.Set(CommonConstants.CartSession, session);
                }
                return Json(new { success = hasChanged, responseText = "Đã xóa!" });
            }
            return Json(new { success = false, responseText = "Lỗi!" });

        }

        /// <summary>
        /// Update Tour quantity
        /// </summary>
        /// <param name="TourId"></param>
        /// <param name="quantity"></param>
        /// <returns></returns>
        public IActionResult UpdateCart(int TourId, int quantity)
        {
            var session = HttpContext.Session.Get<List<ShoppingCartViewModel>>(CommonConstants.CartSession);
            if (session != null)
            {
                bool hasChanged = false;
                if (_TourService.CheckSeatAvaliable(TourId, quantity))
                {
                    foreach (var item in session)
                    {
                        if (item.Tour.Id == TourId)
                        {
                            var Tour = _TourService.GetById(TourId);
                            decimal Price = 0;
                            if (Tour.PromotionPrice == null || Tour.PromotionPrice == 0)
                            {
                                Price = Tour.Price;
                            }
                            else
                            {
                                Price = Tour.PromotionPrice.Value;
                            }
                            item.Tour = Tour;
                            item.Quantity = quantity;
                            item.Price = Price;
                            hasChanged = true;
                        }
                    }
                    if (hasChanged)
                    {
                        HttpContext.Session.Set(CommonConstants.CartSession, session);
                    }
                    Response.StatusCode = (int)HttpStatusCode.OK;
                    return Json(new { success = hasChanged, responseText = "Cập nhật thành công!" });
                }
                else
                {
                    return Json(new { success = hasChanged, responseText = "Số vé còn lại không đủ!" });
                }
            }
            return Json(new { success = false, responseText = "Lỗi!" });
        }
        #endregion
    }
}