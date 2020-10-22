using System;
using System.Collections.Generic;
using System.Text;

namespace Travel.Application.ViewModels.Tour
{
    public class TourPlaceViewModel
    {
        public int Id { get; set; }
        public int Depart { get; set; }
        public int Destination { get; set; }
        public string OrtherPlace { get; set; }
        public int TourId { get; set; }
    }
}
