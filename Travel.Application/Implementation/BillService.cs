using AutoMapper;
using AutoMapper.Configuration.Conventions;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Entities;
using Travel.Data.Enums;
using Travel.Data.IRepositories;
using Travel.Infrastructure.Interfaces;
using Travel.Utilities.Dtos;

namespace Travel.Application.Implementation
{
    public class BillService : IBillService
    {
        private readonly IBillRepository _orderRepository;
        private readonly IBillDetailRepository _orderDetailRepository;
        private readonly ITourRepository _TourRepository;
        private readonly IUnitOfWork _unitOfWork;

        public BillService(IBillRepository orderRepository,
            IBillDetailRepository orderDetailRepository,
            ITourRepository TourRepository,
            IUnitOfWork unitOfWork)
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _TourRepository = TourRepository;
            _unitOfWork = unitOfWork;
        }

        public void Create(BillViewModel billVm)
        {
            var order = Mapper.Map<BillViewModel, Bill>(billVm);
            var orderDetails = Mapper.Map<List<BillDetailViewModel>, List<BillDetail>>(billVm.BillDetails);
            foreach (var detail in orderDetails)
            {
                var Tour = _TourRepository.FindById(detail.TourId);
                if (Tour.PromotionPrice > 0)
                    detail.Price = Tour.PromotionPrice.Value;
                else
                    detail.Price = Tour.Price;
            }
            order.BillDetails = orderDetails;
            order.DateCreated = DateTime.Now;
            order.DateModified = DateTime.Now;
            _orderRepository.Add(order);
        }

        public void Update(BillViewModel billVm)
        {
            //Mapping to order domain
            var order = Mapper.Map<BillViewModel, Bill>(billVm);
            order.DateModified = DateTime.Now;
            //Get order Detail
            var newDetails = order.BillDetails;

            //new details added
            var addedDetails = newDetails.Where(x => x.Id == 0).ToList();

            //get updated details
            var updatedDetails = newDetails.Where(x => x.Id != 0).ToList();

            //Existed details
            var existedDetails = _orderDetailRepository.FindAll(x => x.BillId == billVm.Id);

            //Clear db
            order.BillDetails.Clear();

            foreach (var detail in updatedDetails)
            {
                var Tour = _TourRepository.FindById(detail.TourId);
                if (Tour.PromotionPrice > 0)
                    detail.Price = Tour.PromotionPrice.Value;
                else
                    detail.Price = Tour.Price;
                _orderDetailRepository.Update(detail);
            }

            foreach (var detail in addedDetails)
            {
                var Tour = _TourRepository.FindById(detail.TourId);
                if (Tour.PromotionPrice > 0)
                    detail.Price = Tour.PromotionPrice.Value;
                else
                    detail.Price = Tour.Price;
                _orderDetailRepository.Add(detail);
            }

            _orderDetailRepository.RemoveMultiple(existedDetails.Except(updatedDetails).ToList());
            order.DateModified = DateTime.Now;
            _orderRepository.Update(order);
        }

        public void UpdateStatus(int billId, BillStatus status)
        {
            var order = _orderRepository.FindById(billId);
            order.BillStatus = status;
            order.DateCreated = order.DateCreated;
            order.DateModified = DateTime.Now;
            _orderRepository.Update(order);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public PagedResult<BillViewModel> GetAllPaging(BillStatus status, string startDate, string endDate, string keyword
            , int pageIndex, int pageSize)
        {
            var query = _orderRepository.FindAll();
            if (!string.IsNullOrEmpty(startDate))
            {
                DateTime start = DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.GetCultureInfo("vi-VN"));
                query = query.Where(x => x.DateCreated >= start);
            }
            if (status >= 0)
            {
                query = query.Where(x => x.BillStatus == status);
            }
            if (!string.IsNullOrEmpty(endDate))
            {
                DateTime end = DateTime.ParseExact(endDate, "dd/MM/yyyy", CultureInfo.GetCultureInfo("vi-VN"));
                query = query.Where(x => x.DateCreated <= end);
            }
            if (!string.IsNullOrEmpty(keyword))
            {
                query = query.Where(x => x.CustomerName.Contains(keyword) || x.CustomerMobile.Contains(keyword));
            }
            var totalRow = query.Count();
            var data = query.OrderByDescending(x => x.DateCreated)
                .OrderBy(x => x.BillStatus)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ProjectTo<BillViewModel>()
                .ToList();
            return new PagedResult<BillViewModel>()
            {
                CurrentPage = pageIndex,
                PageSize = pageSize,
                Results = data,
                RowCount = totalRow
            };
        }

        public BillViewModel GetDetail(int billId)
        {
            var bill = _orderRepository.FindSingle(x => x.Id == billId);
            var billVm = Mapper.Map<Bill, BillViewModel>(bill);
            var billDetailVm = _orderDetailRepository.FindAll(x => x.BillId == billId)
                .ProjectTo<BillDetailViewModel>()
                .ToList();
            billVm.BillDetails = billDetailVm;
            return billVm;
        }

        public List<BillDetailViewModel> GetBillDetails(int billId)
        {
            return _orderDetailRepository
                .FindAll(x => x.BillId == billId, c => c.Bill, c => c.Tour)
                .ProjectTo<BillDetailViewModel>().ToList();
        }

        public BillDetailViewModel CreateDetail(BillDetailViewModel billDetailVm)
        {
            var billDetail = Mapper.Map<BillDetailViewModel, BillDetail>(billDetailVm);
            _orderDetailRepository.Add(billDetail);
            return billDetailVm;
        }

        public void DeleteDetail(int TourId, int billId)
        {
            var detail = _orderDetailRepository.FindSingle(
                x => x.TourId == TourId &&
                x.BillId == billId);
            _orderDetailRepository.Remove(detail);
        }

        public void CancelBill(int billId)
        {
            var order = _orderRepository.FindById(billId);
            order.BillStatus = BillStatus.Cancelled;
            order.DateCreated = order.DateCreated;
            order.DateModified = DateTime.Now;
            _orderRepository.Update(order);
        }

        public BillStatus GetPaymentMethodBill(int billId)
        {
            var order = _orderRepository.FindById(billId);
            return order.BillStatus;
        }

        public void ConfirmBill(int billId)
        {
            var order = _orderRepository.FindById(billId);
            order.BillStatus = BillStatus.Completed;
            order.DateCreated = order.DateCreated;
            order.DateModified = DateTime.Now;
            _orderRepository.Update(order);
        }

        public int GetTotalByBillStatus(BillStatus billStatus)
        {
            return _orderRepository.FindAll().Where(x => x.BillStatus == billStatus).Count();
        }

        public List<BillViewModel> GetAll()
        {
            return _orderRepository.FindAll().OrderBy(x => x.DateCreated)
                 .ProjectTo<BillViewModel>().ToList();
        }
    }
}