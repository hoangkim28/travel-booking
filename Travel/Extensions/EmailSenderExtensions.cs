using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Travel.Services
{
    public static class EmailSenderExtensions
    {
        public static Task SendEmailConfirmationAsync(this IEmailSender emailSender, string email, string link)
        {
            return emailSender.SendEmailAsync(email, "XAC NHAN TAI KHOAN",
                $"Nhấn vào đường dẫn này để xác nhận tài khoản: <a href='{HtmlEncoder.Default.Encode(link)}'>link</a>");
        }
    }
}