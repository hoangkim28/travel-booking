﻿using AutoMapper;
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
    public class BillCompletedService : IBillCompletedService
    {
        private readonly IBillCompletedRepository _orderCompletedRepository;
        private readonly IBillCompletedDetailRepository _orderCompletedDetailRepository;
        private readonly ITourRepository _TourRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BillCompletedService(IBillCompletedRepository orderCompletedRepository,
            IBillCompletedDetailRepository orderDetailRepository,
            ITourRepository TourRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _orderCompletedRepository = orderCompletedRepository;
            _orderCompletedDetailRepository = orderDetailRepository;
            _TourRepository = TourRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public void Create(BillCompletedViewModel billVm)
        {
            var orderCompleted = _mapper.Map<BillCompletedViewModel, BillCompleted>(billVm);
            var orderDetails = _mapper.Map<List<BillCompletedDetailViewModel>, List<BillCompletedDetail>>(billVm.BillCompletedDetails);
            
            foreach (var detail in orderDetails)
            {
                var Tour = _TourRepository.FindById(detail.TourId);
                if (Tour.PromotionPrice > 0)
                    detail.Price = Tour.PromotionPrice.Value;
                else
                    detail.Price = Tour.Price;
            }
            orderCompleted.BillCompletedDetails = orderDetails;
            orderCompleted.DateCreated = DateTime.Now;
            orderCompleted.DateModified = DateTime.Now;
            _orderCompletedRepository.Add(orderCompleted);
        }

        public BillCompletedDetailViewModel CreateDetail(BillCompletedDetailViewModel billCompletedDetailVm)
        {
            throw new NotImplementedException();
        }

        public List<BillCompletedViewModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public PagedResult<BillCompletedViewModel> GetAllPaging(string startDate, string endDate, string keyword, int pageIndex, int pageSize)
        {
            var query = _orderCompletedRepository.FindAll();
            if (!string.IsNullOrEmpty(startDate))
            {
                DateTime start = DateTime.ParseExact(startDate, "dd/MM/yyyy", CultureInfo.GetCultureInfo("vi-VN"));
                query = query.Where(x => x.DateCreated >= start);
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
            var data = _mapper.ProjectTo<BillCompletedViewModel>(query.OrderByDescending(x => x.DateCreated)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize))
                .ToList();
            return new PagedResult<BillCompletedViewModel>()
            {
                CurrentPage = pageIndex,
                PageSize = pageSize,
                Results = data,
                RowCount = totalRow
            };
        }

        public List<BillCompletedViewModel> GetCompletedBillDetails(int billId)
        {
            return _mapper.ProjectTo<BillCompletedViewModel>(_orderCompletedDetailRepository
            .FindAll(x => x.BillId == billId, c => c.BillCompleted,c => c.Tour)).ToList();
        }

        public BillCompletedViewModel GetDetail(int billId)
        {
            var bill = _orderCompletedRepository.FindSingle(x => x.Id == billId);
            var billVm = _mapper.Map<BillCompleted, BillCompletedViewModel>(bill);
            var billDetailVm = _mapper.ProjectTo<BillCompletedViewModel>(_orderCompletedRepository.FindAll(x => x.OrderId == billId)).ToList();
            //billVm.BillCompletedDetails = billDetailVm;
            return billVm;
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }
    }
}