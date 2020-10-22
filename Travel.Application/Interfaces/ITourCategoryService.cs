using System.Collections.Generic;
using Travel.Application.ViewModels.Tour;
using Travel.Utilities.Dtos;

namespace Travel.Application.Interfaces
{
    public interface ITourCategoryService
    {
        TourCategoryViewModel Add(TourCategoryViewModel TourCategoryVm);

        void Update(TourCategoryViewModel TourCategoryVm);

        void Delete(int id);

        List<TourCategoryViewModel> GetAll();

        List<TourCategoryViewModel> GetByParentId();

        List<TourCategoryViewModel> GetAll(string keyword);

        PagedResult<TourCategoryViewModel> GetAllPaging(int? parentId, string keyword, int page, int pageSize);
        
        List<TourCategoryViewModel> GetAllByParentId(int parentId);

        TourCategoryViewModel GetById(int id);

        void UpdateParentId(int sourceId, int targetId, Dictionary<int, int> items);

        void ReOrder(int sourceId, int targetId);

        List<TourCategoryViewModel> GetHomeCategories(int top);

        void Save();
    }
}