using System;
using System.ComponentModel.DataAnnotations;

namespace Travel.Models.ManageViewModels
{
    public class IndexViewModel
    {
        [Display(Name = "Tên đăng nhập")]
        public string Username { get; set; }
        [Display(Name = "Xác nhận Email")]
        public bool IsEmailConfirmed { get; set; }
        [Display(Name = "Họ tên")]
        public string FullName { get; set; }
        [Required]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }
        [Display(Name = "Ảnh đại diện")]
        public string Avatar { get; set; }
        [Phone]
        [Display(Name = "Số điện thoại")]
        public string PhoneNumber { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [Display(Name = "Ngày sinh")]
        public DateTime? BirthDay { get; set; }

        [Display(Name = "Địa chỉ")]
        public string Address { get; set; }
        public string Gender { get; set; }
        public string StatusMessage { get; set; }
    }
}