using System.ComponentModel;

namespace Travel.Data.Enums
{
    public enum BillStatus
    {
        [Description("Mới")]
        New,

        [Description("Đang xử lý")]
        InProgress,

        [Description("Trả vé")]
        Returned,

        [Description("Hủy")]
        Cancelled,

        [Description("Đã xác nhận")]
        Completed
    }
}