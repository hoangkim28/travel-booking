using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Data.Enums;
using Travel.Data.Interfaces;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("Places")]
    public class Place : DomainEntity<int>, ISwitchable, IDateTracking
    {
        public Place()
        {

        }
        public Place(int id, string name, string image, string description, Status status)
        {
            Id = id;
            Name = name;
            Image = image;
            Description = description;
            Status = status;
        }
        public Place(string name, string image, string description, Status status)
        {
            Name = name;
            Image = image;
            Description = description;
            Status = status;
        }
        [StringLength(255)]
        [Required]
        public string Name { get; set; }
        [StringLength(255)]
        [MaxLength(255)]
        public string Image { get; set; }
        [StringLength(255)]
        [MaxLength(255)]
        public string Description { get; set; }

        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }
        public Status Status { set; get; }
    }
}
