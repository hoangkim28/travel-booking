using System;
using System.ComponentModel.DataAnnotations;

namespace Travel.Models.AccountViewModels
{
    public class ExternalLoginViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string FullName { get; set; }

        public string UserName { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime? BirthDay { get; set; }
    }
}