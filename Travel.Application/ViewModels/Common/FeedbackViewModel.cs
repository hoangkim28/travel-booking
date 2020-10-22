﻿using System;
using System.ComponentModel.DataAnnotations;
using Travel.Data.Enums;

namespace Travel.Application.ViewModels.Common
{
    public class FeedbackViewModel
    {
        public int Id { set; get; }

        [StringLength(250)]
        [Required]
        public string Name { set; get; }

        [StringLength(250)]
        public string Email { set; get; }

        [StringLength(500)]
        public string Message { set; get; }

        public Status Status { set; get; }
        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }
    }
}