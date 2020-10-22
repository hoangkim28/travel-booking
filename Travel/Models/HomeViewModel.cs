using Travel.Application.ViewModels.Blog;
using Travel.Application.ViewModels.Common;
using Travel.Application.ViewModels.Tour;
using System.Collections.Generic;

namespace Travel.Models
{
    public class HomeViewModel
    {
        public List<BlogViewModel> LastestBlogs { get; set; }
        public List<SlideViewModel> HomeSlides { get; set; }
        public List<TourViewModel> HotTours { get; set; }
        public List<TourViewModel> HotToursForMan { get; set; }
        public List<TourViewModel> HotToursForWomen { get; set; }
        public List<TourViewModel> HotToursForGirl { get; set; }
        public List<TourViewModel> HotToursForBoy { get; set; }
        public List<TourViewModel> TopSellTours { get; set; }
        public List<TourCategoryViewModel> HomeCategories { set; get; }
        public List<TourCategoryViewModel> CategoryByParentId { get; set; }
        public string Title { set; get; }
        public string MetaKeyword { set; get; }
        public string MetaDescription { set; get; }
    }
}
