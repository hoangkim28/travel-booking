using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("TourPlaces")]
    public class TourPlace : DomainEntity<int>
    {
        public TourPlace() { }
        public TourPlace(int tourId, int depart, int destination, string ortherPlace)
        {
            TourId = tourId;
            Depart = depart;
            Destination = destination;
            OrtherPlace = ortherPlace;
        }
        public TourPlace(int id, int tourId, int depart, int destination, string ortherPlace)
        {
            Id = id;
            TourId = tourId;
            Depart = depart;
            Destination = destination;
            OrtherPlace = ortherPlace;
        }

        public int TourId { get; set; }
        public int Depart { get; set; }
        public int Destination { get; set; }
        [StringLength(255)]
        [MaxLength(255)]
        public string OrtherPlace { get; set; }
        [ForeignKey("Depart")]
        public virtual Place DepartFrom { set; get; }
    }
}
