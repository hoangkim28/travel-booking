using AutoMapper;
using AutoMapper.QueryableExtensions;
using System;
using System.Collections.Generic;
using System.Linq;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Entities;
using Travel.Data.IRepositories;
using Travel.Infrastructure.Interfaces;
using Travel.Utilities.Dtos;

namespace Travel.Application.Implementation
{
    public class PlaceService : IPlaceService
    {
        private readonly IPlaceRepository _placeRepository;
        private readonly IUnitOfWork _unitOfWork;
        public PlaceService(IPlaceRepository placeRepository, IUnitOfWork unitOfWork)
        {
            _placeRepository = placeRepository;
            _unitOfWork = unitOfWork;
        }
        public void Create(PlaceViewModel placeVm)
        {
            placeVm.DateModified = DateTime.Now;
            placeVm.DateModified = DateTime.Now;
            var page = Mapper.Map<PlaceViewModel, Place>(placeVm);
            _placeRepository.Add(page);
        }

        public void Update(PlaceViewModel placeVm)
        {
            placeVm.DateModified = DateTime.Now;
            var page = Mapper.Map<PlaceViewModel, Place>(placeVm);
            _placeRepository.Update(page);
        }

        public List<PlaceViewModel> GetAll()
        {
            return _placeRepository.FindAll().ProjectTo<PlaceViewModel>().ToList();
        }

        public PlaceViewModel GetById(int placeId)
        {
            return Mapper.Map<Place, PlaceViewModel>(_placeRepository.FindById(placeId));
        }

        public PagedResult<PlaceViewModel> GetAllPaging(string keyword, int page, int pageSize)
        {
            var query = _placeRepository.FindAll();
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword));

            int totalRow = query.Count();
            var data = query.OrderByDescending(x => x.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            var paginationSet = new PagedResult<PlaceViewModel>()
            {
                Results = data.ProjectTo<PlaceViewModel>().ToList(),
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize
            };

            return paginationSet;
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }


        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public void Delete(int id)
        {
            _placeRepository.Remove(id);
        }
    }
}
