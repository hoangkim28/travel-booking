using Travel.Application.Interfaces;
using Travel.Application.ViewModels.System;
using Travel.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Travel.Areas.Admin.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IAuthorizationService _authorizationService;

        public UserController(IUserService userService, IAuthorizationService authorizationService)
        {
            _userService = userService;
            _authorizationService = authorizationService;
        }

        public async Task<IActionResult> Index()
        {
            var result = await _authorizationService.AuthorizeAsync(User, "USER", Operations.Read);
            if (!result.Succeeded)
                return new RedirectResult("/dang-nhap.html");
            return View();
        }

        public IActionResult GetAll()
        {
            var model = _userService.GetAllAsync();

            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetById(string id)
        {
            var model = await _userService.GetById(id);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int page, int pageSize)
        {
            var model = _userService.GetAllPagingAsync(keyword, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> SaveEntity(AppUserViewModel userVm)
        {
            var canCreate = await _authorizationService.AuthorizeAsync(User, "USER", Operations.Create);
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "USER", Operations.Update);

            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            else
            {
                if (userVm.Id == null && canCreate.Succeeded == true)
                {
                    userVm.DateCreated = DateTime.Now;
                    await _userService.AddAsync(userVm);
                    return new OkObjectResult(userVm);
                }
                else
                {
                    if (canUpdate.Succeeded == true)
                    {
                        await _userService.UpdateAsync(userVm);
                        return new OkObjectResult(userVm);
                    }
                    else
                        return new BadRequestObjectResult(ModelState);
                }
            }
        }

        [HttpPost]
        public async Task<IActionResult> Delete(string id)
        {
            var canDelete = await _authorizationService.AuthorizeAsync(User, "USER", Operations.Delete);

            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }
            else
            {
                if (canDelete.Succeeded == true)
                {
                    await _userService.DeleteAsync(id);
                    return new OkObjectResult(id);
                }
                else
                    return new BadRequestObjectResult(ModelState);
            }
        }
    }
}