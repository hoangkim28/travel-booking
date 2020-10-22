using System.ComponentModel.DataAnnotations;

namespace Travel.Models.ManageViewModels
{
    public class ChangePasswordViewModel
    {
        [Required(ErrorMessage ="Không được trống")]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu cũ")]
        public string OldPassword { get; set; }

        [Required(ErrorMessage = "Không được trống")]
        [StringLength(100, ErrorMessage = "{0} tối thiểu {2} và tối đa {1} kí tự.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Mật khẩu mới")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Không được trống")]
        [DataType(DataType.Password)]
        [Display(Name = "Xác nhận mật khẩu mới")]
        [Compare("NewPassword", ErrorMessage = "Nhập lại mật khẩu không khớp.")]
        public string ConfirmPassword { get; set; }

        public string StatusMessage { get; set; }
    }
}