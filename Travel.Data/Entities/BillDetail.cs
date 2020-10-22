using System.ComponentModel.DataAnnotations.Schema;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("BillDetails")]
    public class BillDetail : DomainEntity<int>
    {
        public BillDetail()
        {
        }

        public BillDetail(int id, int billId, int tourId, int quantity, decimal price)
        {
            Id = id;
            BillId = billId;
            TourId = tourId;
            Quantity = quantity;
            Price = price;
        }

        public BillDetail(int billId, int tourId, int quantity, decimal price)
        {
            BillId = billId;
            TourId = tourId;
            Quantity = quantity;
            Price = price;
        }

        public int BillId { set; get; }

        public int TourId { set; get; }

        public int Quantity { set; get; }

        public decimal Price { set; get; }

        [ForeignKey("BillId")]
        public virtual Bill Bill { set; get; }

        [ForeignKey("TourId")]
        public virtual Tour Tour { set; get; }
    }
}