namespace Travel.Application.ViewModels.Tour
{
    public class TourImageViewModel
    {
        public int Id { get; set; }

        public int TourId { get; set; }

        public TourViewModel Tour { get; set; }

        public string Path { get; set; }

        public string Caption { get; set; }
    }
}