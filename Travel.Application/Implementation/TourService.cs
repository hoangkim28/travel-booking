using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Common;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Entities;
using Travel.Data.Enums;
using Travel.Data.IRepositories;
using Travel.Infrastructure.Interfaces;
using Travel.Utilities.Constants;
using Travel.Utilities.Dtos;
using Travel.Utilities.Helpers;
using static Travel.Utilities.Constants.CommonConstants;

namespace Travel.Application.Implementation
{
    public class TourService : ITourService
    {
        private ITourRepository _TourRepository;
        private ITagRepository _tagRepository;
        private ITourTagRepository _TourTagRepository;
        private ITourPlaceRepository _tourPlaceRepository;
        private ITourImageRepository _TourImageRepository;
        private IUnitOfWork _unitOfWork;
        private IBillDetailRepository _billDetailRepository;

        public TourService(ITourRepository TourRepository,
            ITagRepository tagRepository,
            IUnitOfWork unitOfWork, ITourImageRepository TourImageRepository, ITourPlaceRepository TourPlaceRepository, IBillDetailRepository billDetailRepository,
        ITourTagRepository TourTagRepository)
        {
            _TourRepository = TourRepository;
            _tagRepository = tagRepository;
            _TourTagRepository = TourTagRepository;
            _tourPlaceRepository = TourPlaceRepository;
            _TourImageRepository = TourImageRepository;
            _unitOfWork = unitOfWork;
            _billDetailRepository = billDetailRepository;
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public List<TourViewModel> GetAll()
        {
            return _TourRepository.FindAll(x => x.TourCategory).ProjectTo<TourViewModel>().ToList();
        }

        public List<TourViewModel> GetListToExport(int? categoryId, string keyword, int page, int pageSize)
        {
            var query = _TourRepository.FindAll();
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword));
            if (categoryId.HasValue)
                query = query.Where(x => x.CategoryId == categoryId.Value);
            var data = query.ProjectTo<TourViewModel>().ToList();
            return data;
        }

        public PagedResult<TourViewModel> GetAllPaging(int? categoryId, string keyword, int page, int pageSize)
        {
            // var query = _TourRepository.FindAll(x => x.Status == Status.Active);
            var query = _TourRepository.FindAll();
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword));
            if (categoryId.HasValue)
                query = query.Where(x => x.CategoryId == categoryId.Value);

            int totalRow = query.Count();

            query = query.OrderByDescending(x => x.DateModified)
                .Skip((page - 1) * pageSize).Take(pageSize);

            var data = query.ProjectTo<TourViewModel>().ToList();

            var paginationSet = new PagedResult<TourViewModel>()
            {
                Results = data,
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize
            };
            return paginationSet;

        }
        public PagedResult<TourViewModel> GetAllPagingHome(int? categoryId, string keyword, int page, int pageSize)
        {
            var query = _TourRepository.FindAll().Where(x => x.Status == Status.Active);
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword));
            if (categoryId.HasValue)
                query = query.Where(x => x.CategoryId == categoryId.Value);

            int totalRow = query.Count();

            query = query.OrderByDescending(x => x.DateModified)
                .Skip((page - 1) * pageSize).Take(pageSize);

            var data = query.ProjectTo<TourViewModel>().ToList();

            var paginationSet = new PagedResult<TourViewModel>()
            {
                Results = data,
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize
            };
            return paginationSet;

        }
        public PagedResult<TourViewModel> GetCollection(string type, int page, int pageSize)
        {
            var query = _TourRepository.FindAll().Where(x => x.Status == Status.Active);
            
            if(!string.IsNullOrEmpty(type) || type != Collection.Hot || type != Collection.Lastest || type != Collection.Newest)
            {
                return GetAllPagingHome(null, null, page, pageSize);
            }
            if(type == Collection.Hot)
            {
                query = query.OrderBy(x => x.ViewCount);
            }
            if(type == Collection.Lastest)
            {
                query = query.OrderBy(x => x.DateModified);
            }
            if(type == Collection.Newest)
            {
                query = query.OrderBy(x => x.DateCreated);
            }

            int totalRow = query.Count();

            query = query.OrderByDescending(x => x.DateModified)
                .Skip((page - 1) * pageSize).Take(pageSize);

            var data = query.ProjectTo<TourViewModel>().ToList();

            var paginationSet = new PagedResult<TourViewModel>()
            {
                Results = data,
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize
            };
            return paginationSet;

        }
        public TourViewModel Add(TourViewModel TourVm)
        {
            TourVm.Like = 0;
            TourVm.ViewCount = 0;
            TourVm.DateCreated = DateTime.Now;
            if (TourVm.PromotionPrice == null)
            {
                TourVm.PromotionPrice = 0;
            }
            List<TourTag> TourTags = new List<TourTag>();
            if (!string.IsNullOrEmpty(TourVm.Tags))
            {
                string[] tags = TourVm.Tags.Split(',');
                foreach (string t in tags)
                {
                    var tagId = TextHelper.ToUnsignString(t);
                    if (!_tagRepository.FindAll(x => x.Id == tagId).Any())
                    {
                        Tag tag = new Tag
                        {
                            Id = tagId,
                            Name = t,
                            Type = CommonConstants.TourTag
                        };
                        _tagRepository.Add(tag);
                    }

                    TourTag TourTag = new TourTag
                    {
                        TagId = tagId
                    };
                    TourTags.Add(TourTag);
                }
            }
            var Tour = Mapper.Map<TourViewModel, Tour>(TourVm);
            foreach (var TourTag in TourTags)
            {
                Tour.TourTags.Add(TourTag);
            }
            TourPlace tourPlace = new TourPlace
            {
                TourId = Tour.Id,
                Depart = TourVm.Depart,
                Destination = TourVm.Destination,
            };
            Tour.TourPlaces.Add(tourPlace);
            _TourRepository.Add(Tour);
            return TourVm;
        }

        public bool CheckTourInBill(int id)
        {
            if (_billDetailRepository.FindAll().Where(x => x.TourId == id).Any())
            {
                return false;
            }
            return true;
        }

        public void Delete(int id)
        {
            _tourPlaceRepository.RemoveMultiple(_tourPlaceRepository.FindAll().Where(x => x.TourId == id).ToList());
            _TourRepository.Remove(id);
        }

        public TourViewModel GetById(int id)
        {
            return Mapper.Map<Tour, TourViewModel>(_TourRepository.FindById(id));
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(TourViewModel TourVm)
        {
            TourVm.ViewCount = TourVm.ViewCount;
            TourVm.Like = TourVm.Like;
            List<TourTag> TourTags = new List<TourTag>();

            if (!string.IsNullOrEmpty(TourVm.Tags))
            {
                string[] tags = TourVm.Tags.Split(',');
                foreach (string t in tags)
                {
                    var tagId = TextHelper.ToUnsignString(t);
                    if (!_tagRepository.FindAll(x => x.Id == tagId).Any())
                    {
                        Tag tag = new Tag();
                        tag.Id = tagId;
                        tag.Name = t;
                        tag.Type = CommonConstants.TourTag;
                        _tagRepository.Add(tag);
                    }
                    _TourTagRepository.RemoveMultiple(_TourTagRepository.FindAll(x => x.TourId == TourVm.Id).ToList());
                    TourTag TourTag = new TourTag
                    {
                        TagId = tagId,
                        TourId = TourVm.Id,

                    };
                    TourTags.Add(TourTag);
                }
            }
            var Tour = Mapper.Map<TourViewModel, Tour>(TourVm);
            if (Tour.PromotionPrice == null)
            {
                Tour.PromotionPrice = 0;
            }
            foreach (var TourTag in TourTags)
            {
                Tour.TourTags.Add(TourTag);
            }

            if (_tourPlaceRepository.FindAll(x => x.TourId == TourVm.Id).Count() <= 0)
            {
                TourPlace tourPlace = new TourPlace
                {
                    TourId = Tour.Id,
                    Depart = TourVm.Depart,
                    Destination = TourVm.Destination,
                };
                _tourPlaceRepository.Add(tourPlace);
            }
            else
            {
                var tourPlaces = _tourPlaceRepository.FindAll(x => x.TourId == TourVm.Id).First();
                tourPlaces.TourId = TourVm.Id;
                tourPlaces.Depart = TourVm.Depart;
                tourPlaces.Destination = TourVm.Destination;
                _tourPlaceRepository.Update(tourPlaces);
            }
            _TourRepository.Update(Tour);
        }

        public void ImportExcel(string filePath, int categoryId)
        {
            using (var package = new ExcelPackage(new FileInfo(filePath)))
            {
                ExcelWorksheet workSheet = package.Workbook.Worksheets[0];
                Tour Tour;
                for (int i = workSheet.Dimension.Start.Row + 1; i <= workSheet.Dimension.End.Row; i++)
                {
                    Tour = new Tour();
                    Tour.CategoryId = categoryId;

                    Tour.Name = workSheet.Cells[i, 1].Value.ToString();

                    Tour.Description = workSheet.Cells[i, 2].Value.ToString();

                    decimal.TryParse(workSheet.Cells[i, 3].Value.ToString(), out var originalPrice);
                    Tour.OriginalPrice = originalPrice;

                    decimal.TryParse(workSheet.Cells[i, 4].Value.ToString(), out var price);
                    Tour.Price = price;
                    decimal.TryParse(workSheet.Cells[i, 5].Value.ToString(), out var promotionPrice);

                    Tour.PromotionPrice = promotionPrice;
                    Tour.Content = workSheet.Cells[i, 6].Value.ToString();
                    Tour.SeoKeywords = workSheet.Cells[i, 7].Value.ToString();

                    Tour.SeoDescription = workSheet.Cells[i, 8].Value.ToString();
                    bool.TryParse(workSheet.Cells[i, 9].Value.ToString(), out var hotFlag);

                    Tour.HotFlag = hotFlag;
                    bool.TryParse(workSheet.Cells[i, 10].Value.ToString(), out var homeFlag);
                    Tour.HomeFlag = homeFlag;

                    Tour.Status = Status.Active;

                    _TourRepository.Add(Tour);
                }
            }
        }

        public bool ChangeStatus(int id)
        {
            var tour = _TourRepository.FindById(id);
            if (tour.Status == Status.Active)
            {
                tour.Status = Status.InActive;
            }
            else
            {
                tour.Status = Status.Active;
            }
            _TourRepository.Update(tour);
            return true;
        }

        public void UpdateSeatAvaliable(int id, int qty)
        {
            var Tour = _TourRepository.FindById(id);
            Tour.SeatAvailability -= qty;
            _TourRepository.Update(Tour);
        }

        public bool CheckSeatAvaliable(int id, int qty)
        {
            var Tour = _TourRepository.FindById(id);
            if (Tour.SeatAvailability >= qty)
                return true;
            else
                return false;
        }

        public List<TourImageViewModel> GetImages(int TourId)
        {
            return _TourImageRepository.FindAll(x => x.TourId == TourId)
                .ProjectTo<TourImageViewModel>().ToList();
        }

        public void AddImages(int TourId, string[] images)
        {
            _TourImageRepository.RemoveMultiple(_TourImageRepository.FindAll(x => x.TourId == TourId).ToList());
            foreach (var image in images)
            {
                _TourImageRepository.Add(new TourImage()
                {
                    Path = image,
                    TourId = TourId,
                    Caption = string.Empty
                });
            }
        }

        public List<TourViewModel> GetLastest(int top)
        {
            return _TourRepository.FindAll(x => x.Status == Status.Active).OrderByDescending(x => x.DateModified)
                .Take(top).ProjectTo<TourViewModel>().ToList();
        }

        public List<TourViewModel> GetHotTour(int top)
        {
            return _TourRepository.FindAll(x => x.Status == Status.Active && x.HotFlag == true)
                .OrderByDescending(x => x.DateModified)
                .Take(top)
                .ProjectTo<TourViewModel>()
                .ToList();
        }

        public List<TourViewModel> GetRelatedTours(int id, int top)
        {
            var Tour = _TourRepository.FindById(id);
            return _TourRepository.FindAll(x => x.Status == Status.Active
                && x.Id != id && x.CategoryId == Tour.CategoryId)
            .OrderByDescending(x => x.DateCreated)
            .Take(top)
            .ProjectTo<TourViewModel>()
            .ToList();
        }

        public List<TourViewModel> GetUpsellTours(int top)
        {
            return _TourRepository.FindAll(x => x.Status == Status.Active && x.PromotionPrice != null)
               .OrderByDescending(x => x.DateModified)
               .Take(top)
               .ProjectTo<TourViewModel>().ToList();
        }

        public List<TagViewModel> GetTourTags(int TourId)
        {
            var tags = _tagRepository.FindAll();
            var TourTags = _TourTagRepository.FindAll();

            var query = from t in tags
                        join pt in TourTags
                        on t.Id equals pt.TagId
                        where pt.TourId == TourId
                        select new TagViewModel()
                        {
                            Id = t.Id,
                            Name = t.Name
                        };
            return query.ToList();
        }

        public List<TourTagViewModel> GetTourTagsByTour(int TourId)
        {
            return _TourTagRepository.FindAll().Where(x => x.TourId == TourId).Take(5).ProjectTo<TourTagViewModel>().ToList();
        }

        public List<TourViewModel> HotToursForMan(int top)
        {
            return _TourRepository.FindAll(x => x.Status == Status.Active && x.HotFlag == true)
                .Where(x => x.TourCategory.Id == 1)
                .OrderByDescending(x => x.DateModified)
                .Take(top)
                .ProjectTo<TourViewModel>()
                .ToList();
        }

        public List<TourViewModel> HotToursForWomen(int top)
        {
            return _TourRepository.FindAll(x => x.Status == Status.Active && x.HotFlag == true)
                .Where(x => x.TourCategory.Id == 2)
                .OrderByDescending(x => x.DateModified)
                .Take(top)
                .ProjectTo<TourViewModel>()
                .ToList();
        }

        public List<TourViewModel> HotToursForGirl(int top)
        {
            return _TourRepository.FindAll(x => x.Status == Status.Active && x.HotFlag == true)
                .Where(x => x.TourCategory.Id == 3)
                .OrderByDescending(x => x.DateModified)
                .Take(top)
                .ProjectTo<TourViewModel>()
                .ToList();
        }

        public List<TourViewModel> HotToursForBoy(int top)
        {
            return _TourRepository.FindAll(x => x.Status == Status.Active && x.HotFlag == true)
                .Where(x => x.TourCategory.Id == 4)
                .OrderByDescending(x => x.DateModified)
                .Take(top)
                .ProjectTo<TourViewModel>()
                .ToList();
        }

        public void IncermentViewCount(int id)
        {
            var model = _TourRepository.FindById(id);
            model.ViewCount++;
            _TourRepository.Update(model);
        }
    }
}