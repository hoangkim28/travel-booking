using System;
using System.ComponentModel.DataAnnotations;

namespace Travel.Models.AccountViewModels
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Vui lòng điền Email!")]
        [EmailAddress(ErrorMessage = "Vui lòng nhâp đúng định dạng email.")]
        [Display(Name = "Email *")]
        public string Email { get; set; }
        [Display(Name = "Họ tên *")]
        [Required(ErrorMessage = "Vui lòng nhập Họ tên", AllowEmptyStrings = false)]
        public string FullName { set; get; }
        [Display(Name = "Ngày Sinh")]
        public DateTime BirthDay { set; get; }
        [Display(Name = "Địa chỉ")]
        public string Address { get; set; }
        [Required(ErrorMessage = "Vui lòng điền số điện thoại!")]
        [Display(Name = "Số điện thoại*")]
        public string PhoneNumber { set; get; }

        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        [StringLength(100, ErrorMessage = "{0} tối thiểu {2} và tối đa {1} kí tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu*")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Nhập lại mật khẩu*")]
        [Compare("Password", ErrorMessage = "Mật khẩu nhập lại không trùng khớp.")]
        public string ConfirmPassword { get; set; }
    }
}