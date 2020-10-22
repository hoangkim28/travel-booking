using System.ComponentModel.DataAnnotations;

namespace Travel.Models.AccountViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Xin nhập Email.")]
        [EmailAddress(ErrorMessage ="Vui lòng nhâp đúng định dạng email.")]
        [Display(Name="Email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Xin nhập Mật khẩu.")]
        [StringLength(100, ErrorMessage = "Mật khẩu tối thiểu {2} và tối đa {1} ký tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }

        [Display(Name = "Lưu mật khẩu?")]
        public bool RememberMe { get; set; }
    }
}