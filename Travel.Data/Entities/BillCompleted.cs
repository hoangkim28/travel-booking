using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Travel.Data.Enums;
using Travel.Data.Interfaces;
using Travel.Infrastructure.SharedKernel;

namespace Travel.Data.Entities
{
    [Table("BillCompleteds")]
    public class BillCompleted : DomainEntity<int>, IDateTracking
    {
        public BillCompleted()
        {
        }

        public BillCompleted(string customerName, string customerAddress, string customerMobile, string customerMessage, string customerEmail,
            PaymentMethod paymentMethod, Guid? userId, Guid? customerId, int orderID)
        {
            CustomerName = customerName;
            CustomerAddress = customerAddress;
            CustomerMobile = customerMobile;
            CustomerEmail = customerEmail;
            CustomerMessage = customerMessage;
            PaymentMethod = paymentMethod;
            UserId = userId;
            CustomerId = customerId;
            OrderId = orderID;
        }

        public BillCompleted(int id, string customerName, string customerAddress, string customerMobile, string customerMessage, string customerEmail,
            PaymentMethod paymentMethod, Guid? userId, Guid? customerId,int orderID)
        {
            Id = id;
            CustomerName = customerName;
            CustomerAddress = customerAddress;
            CustomerMobile = customerMobile;
            CustomerEmail = customerEmail;
            CustomerMessage = customerMessage;
            PaymentMethod = paymentMethod;
            UserId = userId;
            CustomerId = customerId;
            OrderId = orderID;
        }

        [Required]
        [MaxLength(256)]
        public string CustomerName { set; get; }

        [Required]
        [MaxLength(256)]
        public string CustomerAddress { set; get; }

        [Required]
        [MaxLength(50)]
        public string CustomerMobile { set; get; }

        [Required]
        [MaxLength(50)]
        public string CustomerEmail { set; get; }

        [Required]
        [MaxLength(256)]
        public string CustomerMessage { set; get; }

        public PaymentMethod PaymentMethod { set; get; }


        public DateTime DateCreated { set; get; }
        public DateTime DateModified { set; get; }

        public Guid? UserId { set; get; }

        public Guid? CustomerId { set; get; }

        public int OrderId { get; set; }

        [ForeignKey("CustomerId")]
        public virtual AppUser AppUser { set; get; }

        public virtual ICollection<BillCompletedDetail> BillCompletedDetails { set; get; }
    }
}