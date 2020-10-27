using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("Slides")]
    public class Slide : DomainEntity<int>
    {
        [StringLength(255)]
        [Required]
        public string Name { set; get; }

        [StringLength(255)]
        [MaxLength(255)]
        public string Description { set; get; }

        [StringLength(255)]
        [MaxLength(255)]
        [Required]
        public string Image { set; get; }

        [StringLength(255)]
        [MaxLength(255)]
        public string Url { set; get; }

        public int? DisplayOrder { set; get; }

        public bool Status { set; get; }

        public string Content { set; get; }

        [StringLength(25)]
        [Required]
        public string GroupAlias { get; set; }
    }
}