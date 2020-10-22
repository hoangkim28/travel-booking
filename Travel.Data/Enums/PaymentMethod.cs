using System.ComponentModel;

namespace Travel.Data.Enums
{
    public enum PaymentMethod
    {
        [Description("Thanh toán tại quầy")]
        CashOnDelivery,

        [Description("Online Banking")]
        OnlineBanking,

        [Description("Payment Gateway")]
        PaymentGateway,

        [Description("Visa")]
        Visa,

        [Description("Master Card")]
        MasterCard,

        [Description("PayPal")]
        PayPal,

        [Description("Atm")]
        Atm
    }
}