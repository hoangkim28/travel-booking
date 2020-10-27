using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Data.Enums;
using Travel.Data.Interfaces;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("Pages")]
    public class Page : DomainEntity<int>, ISwitchable
    {
        public Page()
        {
        }

        public Page(int id, string name, string alias,
            string content, Status status)
        {
            Id = id;
            Name = name;
            Alias = alias;
            Content = content;
            Status = status;
        }

        [Required]
        [MaxLength(255)]
        public string Name { set; get; }

        [MaxLength(255)]
        [Required]

        public string Alias { set; get; }
        [MaxLength(4000)]
        public string Content { set; get; }
        public Status Status { set; get; }
    }
}