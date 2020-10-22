using Travel.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Linq;

namespace Travel.Controllers.Components
{
    public class TopTourViewComponent : ViewComponent
    {
        private ITourService _tourService;

        public TopTourViewComponent(ITourService TourService)
        {
            _tourService = TourService;
        }

        public IViewComponentResult Invoke()
        {
            return View(_tourService.GetHotTour(5));
        }
    }
}
