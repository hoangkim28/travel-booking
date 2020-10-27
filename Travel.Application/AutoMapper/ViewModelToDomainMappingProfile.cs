using AutoMapper;
using System;
using Travel.Application.ViewModels.Blog;
using Travel.Application.ViewModels.Common;
using Travel.Application.ViewModels.System;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Entities;

namespace Travel.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<TourCategoryViewModel, TourCategory>()
            .ConstructUsing(c => new TourCategory(c.Name, c.Description, c.ParentId, c.HomeOrder, c.Image, c.HomeFlag,
            c.SortOrder, c.Status, c.SeoPageTitle, c.SeoAlias, c.SeoKeywords, c.SeoDescription));

            CreateMap<TourViewModel, Tour>()
           .ConstructUsing(c => new Tour(c.Id, c.Name, c.CategoryId, c.Image, c.Price, c.OriginalPrice,
           c.PromotionPrice, c.Description, c.Content, c.HomeFlag, c.HotFlag, c.Like, c.SeatAvailability, c.Duration, c.Seat, c.Code, c.Departure, c.Tags, c.Status,
           c.SeoPageTitle, c.SeoAlias, c.SeoKeywords, c.SeoDescription));

            CreateMap<PlaceViewModel, Place>()
           .ConstructUsing(c => new Place(c.Id, c.Name, c.Image, c.Description, c.Status));

            CreateMap<TourPlaceViewModel, TourPlace>()
            .ConstructUsing(c => new TourPlace(c.Id, c.TourId, c.Depart, c.Destination, c.OrtherPlace));

            CreateMap<BlogViewModel, Blog>()
           .ConstructUsing(c => new Blog(c.Id, c.Name, c.Image, c.Description, c.Content, c.HomeFlag, c.HotFlag, c.ViewCount, c.Tags, c.Status,
           c.SeoPageTitle, c.SeoAlias, c.SeoKeywords, c.SeoDescription));

            CreateMap<AppUserViewModel, AppUser>()
           .ConstructUsing(c => new AppUser(c.Id.GetValueOrDefault(Guid.Empty), c.FullName, c.UserName,
           c.Email, c.PhoneNumber, c.Avatar, c.Status, c.Address));

            CreateMap<PermissionViewModel, Permission>()
            .ConstructUsing(c => new Permission(c.RoleId, c.FunctionId, c.CanCreate, c.CanRead, c.CanUpdate, c.CanDelete));

            CreateMap<BillViewModel, Bill>()
              .ConstructUsing(c => new Bill(c.Id, c.CustomerName, c.CustomerAddress,
              c.CustomerMobile, c.CustomerEmail, c.CustomerMessage, c.BillStatus,
              c.PaymentMethod, c.Status, c.CustomerId, c.UserId));

            CreateMap<BillCompletedViewModel, BillCompleted>()
              .ConstructUsing(c => new BillCompleted(c.Id, c.CustomerName, c.CustomerAddress,
              c.CustomerMobile, c.CustomerEmail, c.CustomerMessage,
              c.PaymentMethod, c.CustomerId, c.UserId, c.OrderId));

            CreateMap<BillDetailViewModel, BillDetail>()
              .ConstructUsing(c => new BillDetail(c.Id, c.BillId, c.TourId,
              c.Quantity, c.Price));

            CreateMap<BillCompletedDetailViewModel, BillCompletedDetail>()
              .ConstructUsing(c => new BillCompletedDetail(c.Id, c.BillId, c.TourId,
              c.Quantity, c.Price));

            CreateMap<ContactViewModel, Contact>()
                .ConstructUsing(c => new Contact(c.Id, c.Name, c.Phone, c.Email, c.Website, c.Address, c.Other, c.Lng, c.Lat, c.Status));

            CreateMap<FeedbackViewModel, Feedback>()
                .ConstructUsing(c => new Feedback(c.Id, c.Name, c.Email, c.Message, c.Status));

            CreateMap<PageViewModel, Page>()
             .ConstructUsing(c => new Page(c.Id, c.Name, c.Alias, c.Content, c.Status));
        }
    }
}