﻿using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("Permissions")]
    public class Permission : DomainEntity<int>
    {
        public Permission()
        {
        }

        public Permission(Guid roleId, string functionId, bool canCreate,
            bool canRead, bool canUpdate, bool canDelete)
        {
            RoleId = roleId;
            FunctionId = functionId;
            CanCreate = canCreate;
            CanRead = canRead;
            CanUpdate = canUpdate;
            CanDelete = canDelete;
        }

        [Required]
        public Guid RoleId { get; set; }

        [Required]
        [MaxLength(128)]
        public string FunctionId { get; set; }

        public bool CanCreate { set; get; }
        public bool CanRead { set; get; }

        public bool CanUpdate { set; get; }
        public bool CanDelete { set; get; }

        [ForeignKey("RoleId")]
        public virtual AppRole AppRole { get; set; }

        [ForeignKey("FunctionId")]
        public virtual Function Function { get; set; }
    }
}