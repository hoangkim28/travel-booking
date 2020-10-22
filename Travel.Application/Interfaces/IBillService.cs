using System.Collections.Generic;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Enums;
using Travel.Utilities.Dtos;

namespace Travel.Application.Interfaces
{
    public interface IBillService
    {
        void Create(BillViewModel billVm);

        void Update(BillViewModel billVm);

        int GetTotalByBillStatus(BillStatus status);

        PagedResult<BillViewModel> GetAllPaging(BillStatus status, string startDate, string endDate, string keyword,
            int pageIndex, int pageSize);

        BillViewModel GetDetail(int billId);

        BillDetailViewModel CreateDetail(BillDetailViewModel billDetailVm);

        void DeleteDetail(int TourId, int billId);

        void UpdateStatus(int orderId, BillStatus status);

        void CancelBill(int billId);

        void ConfirmBill(int billId);

        BillStatus GetPaymentMethodBill(int billId);

        List<BillDetailViewModel> GetBillDetails(int billId);

        List<BillViewModel> GetAll();

        void Save();
    }
}