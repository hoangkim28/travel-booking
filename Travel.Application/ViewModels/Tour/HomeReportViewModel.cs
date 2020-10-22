using System.Collections.Generic;

namespace Travel.Application.ViewModels.Tour
{
    public class HomeReportViewModel
    {
        public int NewBillCount { get; set; }
        public int InProgressBillCount { get; set; }

        public int DoanhThu { get; set; }

        public List<BillViewModel> NewBill { get; set; }

        public List<TourViewModel> Tour { get; set; }
    }
}