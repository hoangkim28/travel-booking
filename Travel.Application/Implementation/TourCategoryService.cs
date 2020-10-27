using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
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
    public class TourCategoryService : ITourCategoryService
    {
        private ITourCategoryRepository _TourCategoryRepository;
        private IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public TourCategoryService(ITourCategoryRepository TourCategoryRepository,
            IUnitOfWork unitOfWork, IMapper mapper)
        {
            _TourCategoryRepository = TourCategoryRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public TourCategoryViewModel Add(TourCategoryViewModel TourCategoryVm)
        {
            var TourCategory = _mapper.Map<TourCategoryViewModel, TourCategory>(TourCategoryVm);
            _TourCategoryRepository.Add(TourCategory);
            return TourCategoryVm;
        }

        public void Delete(int id)
        {
            _TourCategoryRepository.Remove(id);
        }

        public List<TourCategoryViewModel> GetAll()
        {
            return _mapper.ProjectTo<TourCategoryViewModel>(_TourCategoryRepository.FindAll().OrderBy(x => x.ParentId)).ToList();
        }

        public List<TourCategoryViewModel> GetAll(string keyword)
        {
            if (!string.IsNullOrEmpty(keyword))
                return _mapper.ProjectTo<TourCategoryViewModel>(_TourCategoryRepository.FindAll(x => x.Name.Contains(keyword)
                || x.Description.Contains(keyword))
                    .OrderBy(x => x.ParentId)).ToList();
            else
                return _mapper.ProjectTo<TourCategoryViewModel>(_TourCategoryRepository.FindAll().OrderBy(x => x.ParentId))
                    .ToList();
        }

        public PagedResult<TourCategoryViewModel> GetAllPaging(int? parentId, string keyword, int page, int pageSize)
        {
            var query = _mapper.ProjectTo<TourCategoryViewModel>(_TourCategoryRepository.FindAll());
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword));
            if (parentId.HasValue)
                query = query.Where(x => x.ParentId == parentId.Value);

            int totalRow = query.Count();

            query = query.OrderByDescending(x => x.DateCreated)
                .Skip((page - 1) * pageSize).Take(pageSize);

            var data = query.ToList();

            var paginationSet = new PagedResult<TourCategoryViewModel>()
            {
                Results = data,
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize
            };
            return paginationSet;
        }


        public List<TourCategoryViewModel> GetAllByParentId(int parentId)
        {
            return _mapper.ProjectTo<TourCategoryViewModel>(_TourCategoryRepository.FindAll(x => x.Status == Status.Active
            && x.ParentId == parentId))
             .ToList();
        }

        public List<TourCategoryViewModel> GetByParentId()
        {
            return _mapper.ProjectTo<TourCategoryViewModel>(_TourCategoryRepository.FindAll(x => x.Status == Status.Active))
             .ToList();
        }

        public TourCategoryViewModel GetById(int id)
        {
            return _mapper.Map<TourCategory, TourCategoryViewModel>(_TourCategoryRepository.FindById(id));
        }

        public List<TourCategoryViewModel> GetHomeCategories()
        {
            var query = _mapper.ProjectTo<TourCategoryViewModel>(_TourCategoryRepository
                .FindAll(x => x.HomeFlag == true)
                .Where(x => x.ParentId == null)
                .Where(x => x.Status == Status.Active)
                .Where(x => x.Tours.Count() > 0)
                .OrderBy(x => x.HomeOrder));

            var categories = query.ToList();
            foreach (var category in categories)
            {
                //category.Tours = _TourRepository
                //    .FindAll(x => x.HotFlag == true && x.CategoryId == category.Id)
                //    .OrderByDescending(x => x.DateCreated)
                //    .Take(5)
                //    .ProjectTo<TourViewModel>().ToList();
            }
            return categories;
        }

        public void ReOrder(int sourceId, int targetId)
        {
            var source = _TourCategoryRepository.FindById(sourceId);
            var target = _TourCategoryRepository.FindById(targetId);
            int tempOrder = source.SortOrder;
            source.SortOrder = target.SortOrder;
            target.SortOrder = tempOrder;

            _TourCategoryRepository.Update(source);
            _TourCategoryRepository.Update(target);
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(TourCategoryViewModel TourCategoryVm)
        {
            var TourCategory = _mapper.Map<TourCategoryViewModel, TourCategory>(TourCategoryVm);
            _TourCategoryRepository.Update(TourCategory);
        }

        public void UpdateParentId(int sourceId, int targetId, Dictionary<int, int> items)
        {
            var sourceCategory = _TourCategoryRepository.FindById(sourceId);
            sourceCategory.ParentId = targetId;
            _TourCategoryRepository.Update(sourceCategory);

            //Get all sibling
            var sibling = _TourCategoryRepository.FindAll(x => items.ContainsKey(x.Id));
            foreach (var child in sibling)
            {
                child.SortOrder = items[child.Id];
                _TourCategoryRepository.Update(child);
            }
        }
    }
}