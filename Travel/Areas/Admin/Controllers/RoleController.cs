﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.System;
using Travel.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Travel.Areas.Admin.Controllers
{
    public class RoleController : BaseController
    {
        private readonly IRoleService _roleService;
        private readonly IAuthorizationService _authorizationService;

        public RoleController(IRoleService roleService, IAuthorizationService authorizationService)
        {
            _roleService = roleService;
            _authorizationService = authorizationService;
        }
        public async Task<IActionResult> Index()
        {
            // Kiễm tra quyền của người dùng. (Có quyền Xem thì được truy cập)
            var result = await _authorizationService.AuthorizeAsync(User, "ROLE", Operations.Read);
            if (!result.Succeeded)
                return new RedirectResult("/Admin/Login/Index");
            return View();
        }

        public async Task<IActionResult> GetAll()
        {
            var model = await _roleService.GetAllAsync();

            return new OkObjectResult(model);
        }

        [HttpGet]
        public async Task<IActionResult> GetById(Guid id)
        {
            var model = await _roleService.GetById(id);

            return new OkObjectResult(model);
        }

        [HttpGet]
        public IActionResult GetAllPaging(string keyword, int page, int pageSize)
        {
            var model = _roleService.GetAllPagingAsync(keyword, page, pageSize);
            return new OkObjectResult(model);
        }

        [HttpPost]
        public async Task<IActionResult> SaveEntity(AppRoleViewModel roleVm)
        {
            var canUpdate = await _authorizationService.AuthorizeAsync(User, "ROLE", Operations.Update);
            var canCreate = await _authorizationService.AuthorizeAsync(User, "ROLE", Operations.Create);
            if (!ModelState.IsValid)
            {
                IEnumerable<ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                return new BadRequestObjectResult(allErrors);
            }
            if (!roleVm.Id.HasValue && canUpdate.Succeeded == true)
            {
                await _roleService.AddAsync(roleVm);
            }
            else
            {
                await _roleService.UpdateAsync(roleVm);
            }
            return new OkObjectResult(roleVm);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(Guid id)
        {
            var canDelete = await _authorizationService.AuthorizeAsync(User, "ROLE", Operations.Delete);
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }
            if (canDelete.Succeeded == true)
            {
                await _roleService.DeleteAsync(id);
                return new OkObjectResult(id);
            }
            else
                return new BadRequestObjectResult(ModelState);
        }


        [HttpPost]
        public IActionResult ListAllFunction(Guid roleId)
        {
            var functions = _roleService.GetListFunctionWithRole(roleId);
            return new OkObjectResult(functions);
        }

        [HttpPost]
        public IActionResult SavePermission(List<PermissionViewModel> listPermmission, Guid roleId)
        {
            _roleService.SavePermission(listPermmission, roleId);
            return new OkResult();
        }

    }
}