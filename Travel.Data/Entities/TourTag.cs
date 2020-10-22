using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    public class TourTag : DomainEntity<int>
    {
        public int TourId { get; set; }

        [StringLength(50)]
        [Column(TypeName = "varchar")]
        public string TagId { set; get; }

        [ForeignKey("TourId")]
        public virtual Tour Tour { set; get; }

        [ForeignKey("TagId")]
        public virtual Tag Tag { set; get; }
    }
}