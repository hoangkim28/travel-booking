namespace Travel.Application.ViewModels.Tour
{
    public class BillDetailViewModel
    {
        public int Id { get; set; }

        public int BillId { set; get; }

        public int TourId { set; get; }

        public int Quantity { set; get; }

        public decimal Price { set; get; }

        public BillViewModel Bill { set; get; }

        public TourViewModel Tour { set; get; }
    }
}