using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("Footers")]
    public class Footer : DomainEntity<string>
    {
        [Required]
        [MaxLength(4000)]
        public string Content { set; get; }
    }
}