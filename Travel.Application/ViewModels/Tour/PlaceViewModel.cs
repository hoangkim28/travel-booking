using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Travel.Data.Enums;

namespace Travel.Application.ViewModels.Tour
{
    public class PlaceViewModel
    {
        public int Id { get; set; }
        [StringLength(255)]
        [Required]
        public string Name { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
        [StringLength(255)]
        public string Description { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        [DefaultValue(0)]
        public Status Status { set; get; }
    }
}
