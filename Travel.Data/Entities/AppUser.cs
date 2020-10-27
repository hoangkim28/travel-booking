using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Data.Enums;
using Travel.Data.Interfaces;

namespace Travel.Data.Entities
{
    [Table("Users")]
    public class AppUser : IdentityUser<Guid>, IDateTracking, ISwitchable
    {
        public AppUser()
        {
        }

        public AppUser(Guid id, string fullName, string userName,
            string email, string phoneNumber, string avatar, Status status, string address)
        {
            Id = id;
            FullName = fullName;
            UserName = userName;
            Email = email;
            PhoneNumber = phoneNumber;
            Avatar = avatar;
            Status = status;
            Address = address;
        }
        [MaxLength(100)]
        public string FullName { get; set; }

        public DateTime? BirthDay { set; get; }
        [MaxLength(100)]
        public string Address { get; set; }
        [MaxLength(100)]
        public string Avatar { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public Status Status { get; set; }
    }
}