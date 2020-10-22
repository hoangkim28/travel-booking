using System.Collections.Generic;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Enums;
using Travel.Utilities.Dtos;

namespace Travel.Application.Interfaces
{
    public interface IBillCompletedService
    {
        void Create(BillCompletedViewModel billVm);

        PagedResult<BillCompletedViewModel> GetAllPaging(string startDate, string endDate, string keyword,
            int pageIndex, int pageSize);

        BillCompletedViewModel GetDetail(int billId);

        BillCompletedDetailViewModel CreateDetail(BillCompletedDetailViewModel billCompletedDetailVm);


        List<BillCompletedViewModel> GetCompletedBillDetails(int billId);

        List<BillCompletedViewModel> GetAll();

        void Save();
    }
}