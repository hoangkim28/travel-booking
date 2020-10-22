using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Travel.Areas.Admin.Controllers
{
    public class ReportController : Controller
    {
        public IActionResult Revenues()
        {
            return View();
        }
    }
}