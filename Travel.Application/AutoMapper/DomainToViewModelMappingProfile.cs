using AutoMapper;
using Travel.Application.ViewModels.Blog;
using Travel.Application.ViewModels.Common;
using Travel.Application.ViewModels.System;
using Travel.Application.ViewModels.Tour;
using Travel.Data.Entities;

namespace Travel.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<TourCategory, TourCategoryViewModel>();
            CreateMap<Tour, TourViewModel>();
            CreateMap<Blog, BlogViewModel>();
            CreateMap<Function, FunctionViewModel>();
            CreateMap<AppUser, AppUserViewModel>();
            CreateMap<AppRole, AppRoleViewModel>();
            CreateMap<Bill, BillViewModel>();
            CreateMap<BillCompleted, BillCompletedViewModel>();
            CreateMap<TourTag, TourTagViewModel>();
            CreateMap<Place, PlaceViewModel>();
            CreateMap<TourPlace, TourPlaceViewModel>();
            CreateMap<BillDetail, BillDetailViewModel>();
            CreateMap<BillCompletedDetail, BillCompletedDetailViewModel>();
            CreateMap<TourImage, TourImageViewModel>().MaxDepth(2);
            CreateMap<Blog, BlogViewModel>().MaxDepth(2);
            CreateMap<BlogTag, BlogTagViewModel>().MaxDepth(2);
            CreateMap<Slide, SlideViewModel>().MaxDepth(2);
            CreateMap<SystemConfig, SystemConfigViewModel>().MaxDepth(2);
            CreateMap<Footer, FooterViewModel>().MaxDepth(2);
            CreateMap<Feedback, FeedbackViewModel>().MaxDepth(2);
            CreateMap<Contact, ContactViewModel>().MaxDepth(2);
            CreateMap<Page, PageViewModel>().MaxDepth(2);
            CreateMap<TourPlace, TourPlaceViewModel>().MaxDepth(2);
        }
    }
}