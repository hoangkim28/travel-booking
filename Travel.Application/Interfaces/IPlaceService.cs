using System;
using System.Collections.Generic;
using System.Text;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Entities;
using Travel.Utilities.Dtos;

namespace Travel.Application.Interfaces
{
    public interface IPlaceService
    {
        void Create(PlaceViewModel placeVm);

        void Update(PlaceViewModel placeVm);

        void Delete(int id);

        PlaceViewModel GetById(int id);

        List<PlaceViewModel> GetAll();

        PagedResult<PlaceViewModel> GetAllPaging(string keyword, int page, int pageSize);

        void Save();
    }
}
