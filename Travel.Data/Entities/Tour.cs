using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Data.Enums;
using Travel.Data.Interfaces;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("Tours")]
    public class Tour : DomainEntity<int>, ISwitchable, IDateTracking, IHasSeoMetaData
    {
        public Tour()
        {
            TourTags = new List<TourTag>();
            TourPlaces = new List<TourPlace>();
        }

        public Tour(string name, int categoryId, string thumbnailImage,
            decimal price, decimal originalPrice, decimal? promotionPrice,
            string description, string content, bool? homeFlag,
            int like, int seatAvailability, int seat, int duration,
            string code, DateTime departure, bool? hotFlag,
            string tags, Status status, string seoPageTitle,
            string seoAlias, string seoMetaKeyword,
            string seoMetaDescription)
        {
            Name = name;
            CategoryId = categoryId;
            Image = thumbnailImage;
            Price = price;
            OriginalPrice = originalPrice;
            PromotionPrice = promotionPrice;
            Description = description;
            Content = content;
            HomeFlag = homeFlag;
            HotFlag = hotFlag;
            Duration = duration;
            Departure = departure;
            Code = code;
            Like = like;
            Seat = seat;
            SeatAvailability = seatAvailability;
            Tags = tags;
            Status = status;
            SeoPageTitle = seoPageTitle;
            SeoAlias = seoAlias;
            SeoKeywords = seoMetaKeyword;
            SeoDescription = seoMetaDescription;
            TourTags = new List<TourTag>();
            TourPlaces = new List<TourPlace>();
        }

        public Tour(int id, string name, int categoryId, string thumbnailImage,
             decimal price, decimal originalPrice, decimal? promotionPrice,
             string description, string content, bool? homeFlag, bool? hotFlag,
             int like, int seatAvailability, int seat, int duration,
             string code, DateTime departure,
             string tags, Status status, string seoPageTitle,
             string seoAlias, string seoMetaKeyword,
             string seoMetaDescription)
        {
            Id = id;
            Name = name;
            CategoryId = categoryId;
            Image = thumbnailImage;
            Price = price;
            OriginalPrice = originalPrice;
            PromotionPrice = promotionPrice;
            Description = description;
            Content = content;
            HomeFlag = homeFlag;
            HotFlag = hotFlag;
            Duration = duration;
            Departure = departure;
            Code = code;
            Like = like;
            Seat = seat;
            SeatAvailability = seatAvailability;
            Tags = tags;
            Status = status;
            SeoPageTitle = seoPageTitle;
            SeoAlias = seoAlias;
            SeoKeywords = seoMetaKeyword;
            SeoDescription = seoMetaDescription;
            TourTags = new List<TourTag>();
            TourPlaces = new List<TourPlace>();
        }

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
        [MaxLength(50)]
        public string Code { get; set; }

        [Column(TypeName = "Date")]
        public DateTime Departure { set; get; }

        [StringLength(255)]
        [MaxLength(255)]
        public string Description { get; set; }

        public string Content { get; set; }

        public bool? HomeFlag { get; set; }

        public bool? HotFlag { get; set; }

        public int? ViewCount { get; set; }

        [DefaultValue(0)]
        public int Like { get; set; }

        [StringLength(255)]
        [MaxLength(255)]
        public string Tags { get; set; }

        [ForeignKey("CategoryId")]
        public virtual TourCategory TourCategory { set; get; }
        [StringLength(255)]
        [MaxLength(255)]
        public string SeoPageTitle { set; get; }

        [StringLength(255)]
        [MaxLength(255)]
        public string SeoAlias { set; get; }

        [StringLength(255)]
        [MaxLength(255)]
        public string SeoKeywords { set; get; }

        [StringLength(255)]
        [MaxLength(255)]
        public string SeoDescription { set; get; }

        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }
        public virtual ICollection<TourTag> TourTags { set; get; }

        public virtual ICollection<TourPlace> TourPlaces { set; get; }
        public Status Status { set; get; }
    }
}