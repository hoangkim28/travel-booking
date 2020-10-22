using Travel.Application.ViewModels.Common;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Enums;
using Travel.Utilities.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Travel.Models
{
    public class CheckoutViewModel : BillViewModel
    {
        public List<ShoppingCartViewModel> Carts { get; set; }
        public List<EnumModel> PaymentMethods
        {
            get
            {
                return ((PaymentMethod[])Enum.GetValues(typeof(PaymentMethod)))
                    .Select(c => new EnumModel
                    {
                        Value = (int)c,
                        Name = c.GetDescription()
                    }).ToList();
            }
        }
    }
}
