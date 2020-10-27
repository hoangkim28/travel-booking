using System.Collections.Generic;

namespace Travel.Application.ViewModels.Tour
{
    public class BillCompletedDetailViewModel
    {
        public int Id { get; set; }

        public int BillId { set; get; }

        public int TourId { set; get; }

        public int Quantity { set; get; }

        public decimal Price { set; get; }

        public List<BillCompletedViewModel> BillCompleted { set; get; }

        public TourViewModel Tour { set; get; }
    }
}