using Travel.Application.ViewModels.Tour;
using Travel.Utilities.Dtos;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Application.ViewModels.Common;

namespace Travel.Models.TourViewModels
{
    public class CollectionViewModel
    {
        public PagedResult<TourViewModel> Data { get; set; }

        public CollectionInfo CollectionInfo { set; get; }
        public List<TourCategoryViewModel> Categories { set; get; }
        public string SortType { set; get; }

        public int? PageSize { set; get; }

        public List<SelectListItem> SortTypes { get; } = new List<SelectListItem>
        {
            new SelectListItem(){Value = "lastest",Text = "Mới nhất"},
            new SelectListItem(){Value = "price",Text = "Giá từ thấp đến cao"},
            new SelectListItem(){Value = "name",Text = "Tên Tour"},
        };

        public List<SelectListItem> PageSizes { get; } = new List<SelectListItem>
        {
            new SelectListItem(){Value = "5",Text = "5"},
            new SelectListItem(){Value = "10",Text = "10"},
            new SelectListItem(){Value = "15",Text = "15"},
        };
    }
}
