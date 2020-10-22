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
    public class TourPlaceService : ITourPlaceService
    {
        private readonly ITourPlaceRepository _tourPlaceRepository;
        private readonly IUnitOfWork _unitOfWork;
        public TourPlaceService(ITourPlaceRepository tourPlaceRepository, IUnitOfWork unitOfWork)
        {
            _tourPlaceRepository = tourPlaceRepository;
            _unitOfWork = unitOfWork;
        }
        public void Create(TourPlaceViewModel placeVm)
        {
            var page = Mapper.Map<TourPlaceViewModel, TourPlace>(placeVm);
            _tourPlaceRepository.Add(page);
        }

        public void Update(TourPlaceViewModel placeVm)
        {
            var page = Mapper.Map<TourPlaceViewModel, TourPlace>(placeVm);
            _tourPlaceRepository.Update(page);
        }

        public List<TourPlaceViewModel> GetAll()
        {
            return _tourPlaceRepository.FindAll().ProjectTo<TourPlaceViewModel>().ToList();
        }

        public TourPlaceViewModel GetById(int placeId)
        {
            return Mapper.Map<TourPlace, TourPlaceViewModel>(_tourPlaceRepository.FindById(placeId));
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
            _tourPlaceRepository.Remove(id);
        }

        public TourPlaceViewModel GetAllByTourId(int tourId)
        {
            var model = _tourPlaceRepository.FindAll(x => x.TourId == tourId);
            if (model.Count() <= 0)
                return null;
            return model.ProjectTo<TourPlaceViewModel>().First();
        }
    }
}
