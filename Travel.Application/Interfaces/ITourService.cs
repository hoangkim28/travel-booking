using System;
using System.Collections.Generic;
using Travel.Application.ViewModels.Common;
using Travel.Application.ViewModels.Tour;
using Travel.Utilities.Dtos;

namespace Travel.Application.Interfaces
{
    public interface ITourService : IDisposable
    {
        List<TourViewModel> GetAll();

        List<TourViewModel> GetListToExport(int? categoryId, string keyword, int page, int pageSize);

        PagedResult<TourViewModel> GetAllPaging(int? categoryId, string keyword, int page, int pageSize);

        PagedResult<TourViewModel> GetAllPagingHome(int? categoryId, string keyword, int page, int pageSize);

        PagedResult<TourViewModel> GetCollection(string type, int page, int pageSize);

        TourViewModel Add(TourViewModel Tour);

        void Update(TourViewModel Tour);

        void Delete(int id);

        bool CheckTourInBill(int id);

        bool ChangeStatus(int id);

        TourViewModel GetById(int id);

        //TourTagViewModel GetTourTagsByTour(int id);

        void ImportExcel(string filePath, int categoryId);

        void AddImages(int TourId, string[] images);

        void UpdateSeatAvaliable(int id, int qty);

        bool CheckSeatAvaliable(int id, int qty);

        void IncermentViewCount(int id);

        List<TourImageViewModel> GetImages(int TourId);

        List<TourViewModel> GetLastest(int top);

        List<TourViewModel> GetHotTour(int top);

        List<TourViewModel> HotToursForMan(int top);

        List<TourViewModel> HotToursForWomen(int top);

        List<TourViewModel> HotToursForGirl(int top);

        List<TourViewModel> HotToursForBoy(int top);

        List<TourViewModel> GetRelatedTours(int id, int top);

        List<TourViewModel> GetUpsellTours(int top);

        List<TagViewModel> GetTourTags(int TourId);
        List<TourTagViewModel> GetTourTagsByTour(int TourId);
        void Save();
    }
}