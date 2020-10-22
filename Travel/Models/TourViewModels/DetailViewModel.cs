using Travel.Application.ViewModels.Common;
using Travel.Application.ViewModels.Tour;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Collections.Generic;

namespace Travel.Models.TourViewModels
{
    public class DetailViewModel
    {
        public TourViewModel Tour { get; set; }

        public List<TourViewModel> RelatedTours { get; set; }

        public TourCategoryViewModel Category { get; set; }

        public List<TourImageViewModel> TourImages { set; get; }

        public List<TourViewModel> UpsellTours { get; set; }

        public List<TourViewModel> LastestTours { get; set; }

        public List<TagViewModel> Tags { set; get; }

        public List<SelectListItem> Colors { set; get; }


        public List<SelectListItem> Sizes { set; get; }

        public bool Available { set; get; }
    }
}
