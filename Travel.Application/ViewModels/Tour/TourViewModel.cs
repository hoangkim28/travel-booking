using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Data.Enums;

namespace Travel.Application.ViewModels.Tour
{
    public class TourViewModel
    {
        public int Id { get; set; }

        [StringLength(255)]
        [Required]
        public string Name { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [StringLength(255)]
        public string Image { get; set; }

        [Required]
        [DefaultValue(0)]
        public decimal Price { get; set; }

        [DefaultValue(0)]
        public decimal? PromotionPrice { get; set; }

        [Required]
        public decimal OriginalPrice { get; set; }
        [Required]
        public int Duration { get; set; }

        [Required]
        public int Seat { get; set; }
        [Required]
        public int SeatAvailability { get; set; }

        [StringLength(50)]
        public string Code { get; set; }

        [Column(TypeName = "Date")]
        [DataType(DataType.Date)]
        public DateTime Departure { set; get; }
        [StringLength(255)]
        public string Description { get; set; }

        public string Content { get; set; }

        public bool? HomeFlag { get; set; }

        public bool? HotFlag { get; set; }

        public int? ViewCount { get; set; }

        [DefaultValue(0)]
        public int Like { get; set; }

        [StringLength(255)]
        public string Tags { get; set; }

        public TourCategoryViewModel TourCategory { set; get; }

        public TourTagViewModel TourTag { set; get; }

        public TourPlaceViewModel TourPlace { set; get; }
        [Required]
        public int Depart { get; set; }
        [Required]
        public int Destination { get; set; }
        public string SeoPageTitle { set; get; }

        [StringLength(255)]
        public string SeoAlias { set; get; }

        [StringLength(255)]
        public string SeoKeywords { set; get; }

        [StringLength(255)]
        public string SeoDescription { set; get; }

        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }
        [DefaultValue(0)]
        public Status Status { set; get; }
    }
}