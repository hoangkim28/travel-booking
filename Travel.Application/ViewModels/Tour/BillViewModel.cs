using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Travel.Data.Enums;

namespace Travel.Application.ViewModels.Tour
{
    public class BillViewModel
    {
        public int Id { get; set; }

        [MaxLength(256)]
        [Required(ErrorMessage = "Vui lòng nhập họ tên")]
        [Display(Name = "Họ và tên")]
        public string CustomerName { set; get; }

        [Required(ErrorMessage = "Vui lòng nhập địa chỉ")]
        [MaxLength(256)]
        [Display(Name = "Địa chỉ nhận hàng")]
        public string CustomerAddress { set; get; }

        [MaxLength(256)]
        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "Vui lòng nhâp đúng định dạng email.")]
        [Required(ErrorMessage = "Vui lòng nhập Email")]
        public string CustomerEmail { set; get; }

        [Display(Name = "Điện thoại")]
        [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
        [MaxLength(50)]
        public string CustomerMobile { set; get; }

        [MaxLength(256)]
        [Display(Name = "Ghi chú thêm cho đơn hàng")]
        public string CustomerMessage { set; get; }

        public PaymentMethod PaymentMethod { set; get; }

        public BillStatus BillStatus { set; get; }

        public DateTime DateCreated { set; get; }

        public DateTime DateModified { set; get; }

        public Status Status { set; get; }

        public Guid? CustomerId { set; get; }

        public Guid? UserId { set; get; }

        public List<BillDetailViewModel> BillDetails { set; get; }
    }
}