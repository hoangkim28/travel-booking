using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("TourImages")]
    public class TourImage : DomainEntity<int>
    {
        public int TourId { get; set; }

        [ForeignKey("TourId")]
        public virtual Tour Tour { get; set; }

        [StringLength(250)]
        [MaxLength(250)]
        public string Path { get; set; }

        [StringLength(250)]
        [MaxLength(250)]
        public string Caption { get; set; }
    }
}