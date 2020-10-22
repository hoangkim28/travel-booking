using System.Collections.Generic;
using System.Threading.Tasks;
using Travel.Application.Dapper.ViewModels;

namespace Travel.Application.Dapper.Interfaces
{
    public interface IReportService
    {
        Task<IEnumerable<RevenueReportViewModel>> GetReportAsync(string fromDate, string toDate);
    }
}