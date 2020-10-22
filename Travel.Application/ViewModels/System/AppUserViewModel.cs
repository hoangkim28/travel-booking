using System;
using System.Collections.Generic;
using System.ComponentModel;
using Travel.Data.Enums;

namespace Travel.Application.ViewModels.System
{
    public class AppUserViewModel
    {
        public AppUserViewModel()
        {
            Roles = new List<string>();
        }

        public Guid? Id { set; get; }
        [DisplayName("Họ và tên")]
        public string FullName { set; get; }
        [DisplayName("Ngày sinh")]
        public DateTime? BirthDay { set; get; }
        [DisplayName("Email")]
        public string Email { set; get; }
        [DisplayName("Mật khẩu")]
        public string Password { set; get; }
        [DisplayName("Tên đăng nhập")]
        public string UserName { set; get; }
        [DisplayName("Địa chỉ")]
        public string Address { get; set; }
        [DisplayName("Điện thoại")]
        public string PhoneNumber { set; get; }
        [DisplayName("Ảnh dại diện")]
        public string Avatar { get; set; }
        public Status Status { get; set; }

        public DateTime DateCreated { get; set; }

        public List<string> Roles { get; set; }
    }
}