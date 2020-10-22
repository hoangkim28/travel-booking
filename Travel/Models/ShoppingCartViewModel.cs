using Travel.Application.ViewModels.Tour;

namespace Travel.Models
{
    public class ShoppingCartViewModel
    {
        public TourViewModel Tour { set; get; }

        public int Quantity { set; get; }

        public decimal Price { set; get; }
    }
}
