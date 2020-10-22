using System;
using System.Collections.Generic;
using System.Text;
using Travel.Application.ViewModels.Tour;
using Travel.Utilities.Dtos;

namespace Travel.Application.Interfaces
{
    public interface ITourPlaceService
    {
        void Create(TourPlaceViewModel tourPlaceVm);

        void Update(TourPlaceViewModel tourPlaceVm);

        void Delete(int id);

        TourPlaceViewModel GetById(int id);

        List<TourPlaceViewModel> GetAll();

        TourPlaceViewModel GetAllByTourId(int tourId);

        void Save();
    }
}

