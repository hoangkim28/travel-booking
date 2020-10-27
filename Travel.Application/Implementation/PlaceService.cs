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
        private readonly IMapper _mapper;
        public PlaceService(IPlaceRepository placeRepository, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _placeRepository = placeRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public void Create(PlaceViewModel placeVm)
        {
            placeVm.DateModified = DateTime.Now;
            placeVm.DateModified = DateTime.Now;
            var page = _mapper.Map<PlaceViewModel, Place>(placeVm);
            _placeRepository.Add(page);
        }

        public void Update(PlaceViewModel placeVm)
        {
            placeVm.DateModified = DateTime.Now;
            var page = _mapper.Map<PlaceViewModel, Place>(placeVm);
            _placeRepository.Update(page);
        }

        public List<PlaceViewModel> GetAll()
        {
            return _mapper.ProjectTo<PlaceViewModel>(_placeRepository.FindAll()).ToList();
        }

        public PlaceViewModel GetById(int placeId)
        {
            return _mapper.Map<Place, PlaceViewModel>(_placeRepository.FindById(placeId));
        }

        public PagedResult<PlaceViewModel> GetAllPaging(string keyword, int page, int pageSize)
        {
            var query = _mapper.ProjectTo<PlaceViewModel>(_placeRepository.FindAll());
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword));

            int totalRow = query.Count();
            var data = query.OrderByDescending(x => x.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            var paginationSet = new PagedResult<PlaceViewModel>()
            {
                Results = data.ToList(),
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
