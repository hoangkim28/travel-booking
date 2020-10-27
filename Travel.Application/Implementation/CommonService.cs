using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using System.Linq;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Common;
using Travel.Data.Entities;
using Travel.Data.IRepositories;
using Travel.Infrastructure.Interfaces;
using Travel.Utilities.Constants;

namespace Travel.Application.Implementation
{
    public class CommonService : ICommonService
    {
        private IFooterRepository _footerRepository;
        private ISystemConfigRepository _systemConfigRepository;
        private IUnitOfWork _unitOfWork;
        private ISlideRepository _slideRepository;
        private readonly IMapper _mapper;
        public CommonService(IFooterRepository footerRepository,
            ISystemConfigRepository systemConfigRepository,
            IUnitOfWork unitOfWork,
            ISlideRepository slideRepository,
            IMapper mapper)
        {
            _footerRepository = footerRepository;
            _unitOfWork = unitOfWork;
            _systemConfigRepository = systemConfigRepository;
            _slideRepository = slideRepository;
            _mapper = mapper;
        }

        public FooterViewModel GetFooter()
        {
            return _mapper.Map<Footer, FooterViewModel>(_footerRepository.FindSingle(x => x.Id ==
            CommonConstants.DefaultFooterId));
        }

        public List<SlideViewModel> GetSlides(string groupAlias)
        {
            return _mapper.ProjectTo<SlideViewModel>(_slideRepository.FindAll(x => x.Status && x.GroupAlias == groupAlias)).ToList();
        }

        public SystemConfigViewModel GetSystemConfig(string code)
        {
            return _mapper.Map<SystemConfig, SystemConfigViewModel>(_systemConfigRepository.FindSingle(x => x.Id == code));
        }
    }
}