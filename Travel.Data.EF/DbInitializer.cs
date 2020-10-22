using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Travel.Data.Entities;
using Travel.Data.Enums;
using Travel.Utilities.Constants;

namespace Travel.Data.EF
{
    public class DbInitializer
    {
        private readonly AppDbContext _context;
        private UserManager<AppUser> _userManager;
        private RoleManager<AppRole> _roleManager;

        public DbInitializer(AppDbContext context, UserManager<AppUser> userManager, RoleManager<AppRole> roleManager)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task Seed()
        {
            if (!_roleManager.Roles.Any())
            {
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Admin",
                    NormalizedName = "Admin",
                    Description = "Quản trị viên"
                });
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Staff",
                    NormalizedName = "Staff",
                    Description = "Nhân viên"
                });
                await _roleManager.CreateAsync(new AppRole()
                {
                    Name = "Customer",
                    NormalizedName = "Customer",
                    Description = "Khách hàng"
                });
            }
            if (!_userManager.Users.Any())
            {
                await _userManager.CreateAsync(new AppUser()
                {
                    UserName = "Sonb1401086@student.ctu.edu.vn",
                    FullName = "Nguyễn Thanh Sơn",
                    Email = "Sonb1401086@student.ctu.edu.vn",
                    PhoneNumber = "0907666155",
                    Address = "DHCT Khu 2, 3/2 Ninh Kiều, TP.Cần Thơ",
                    BirthDay = DateTime.Today,
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    Status = Status.Active
                }, "Sonb1401086@student.ctu.edu.vn"); ;
                var user = await _userManager.FindByEmailAsync("Sonb1401086@student.ctu.edu.vn");
                await _userManager.AddToRoleAsync(user, CommonConstants.AppRole.AdminRole);
            }
            if (!_context.Contacts.Any())
            {
                _context.Contacts.Add(new Contact()
                {
                    Id = CommonConstants.DefaultContactId,
                    Address = "Hẻm 116A Đường 3-2 (xéo cổng A ĐH Cần Thơ), Xuân Khánh, Ninh Kiều, Cần Thơ, Vietnam",
                    Email = "support@travelista.com",
                    Name = "travelista.com.vn",
                    Phone = "0907666155",
                    Status = Status.Active,
                    Website = "http://travelista.com.vn",
                    Lat = 10.0289655,
                    Lng = 105.7703356
                });
            }
            if (_context.Functions.Count() == 0)
            {
                _context.Functions.AddRange(new List<Function>()
                {
                    new Function() {Id = "SYSTEM", Name = "Hệ thống",ParentId = null,SortOrder = 9,Status = Status.Active,URL = "/",IconCss = "fa-desktop"  },
                    new Function() {Id = "ROLE", Name = "Nhóm - Quyền",ParentId = "SYSTEM",SortOrder = 1,Status = Status.Active,URL = "/admin/role/index",IconCss = "fa-home"  },
                    new Function() {Id = "FUNCTION", Name = "Chức năng",ParentId = "SYSTEM",SortOrder = 2,Status = Status.InActive,URL = "/admin/function/index",IconCss = "fa-home"  },
                    new Function() {Id = "USER", Name = "Người dùng",ParentId = "SYSTEM",SortOrder =3,Status = Status.Active,URL = "/admin/user/index",IconCss = "fa-home"  },
                    new Function() {Id = "ACTIVITY", Name = "Nhật ký",ParentId = "SYSTEM",SortOrder = 4,Status = Status.InActive,URL = "/admin/activity/index",IconCss = "fa-home"  },
                    new Function() {Id = "ERROR", Name = "Lỗi",ParentId = "SYSTEM",SortOrder = 5,Status = Status.InActive,URL = "/admin/error/index",IconCss = "fa-home"  },
                    new Function() {Id = "SETTING", Name = "Cấu hình",ParentId = "SYSTEM",SortOrder = 6,Status = Status.InActive,URL = "/admin/setting/index",IconCss = "fa-home"  },
                    new Function() {Id = "TOUR",Name = "Quản Lý Tour",ParentId = null,SortOrder = 2,Status = Status.Active,URL = "/",IconCss = "fa-chevron-down"  },
                    new Function() {Id = "TOUR_CATEGORY",Name = "Danh mục Tour",ParentId = "TOUR",SortOrder =1,Status = Status.Active,URL = "/admin/Tourcategory/index",IconCss = "fa-chevron-down"  },
                    new Function() {Id = "TOUR_LIST",Name = "Danh sách Tour",ParentId = "TOUR",SortOrder = 2,Status = Status.Active,URL = "/admin/Tour/index",IconCss = "fa-chevron-down"  },
                    new Function() {Id = "ORDER",Name = "Quản lý Đơn đặt",ParentId = null,SortOrder = 1,Status = Status.Active,URL = "/admin",IconCss = "fa-shopping-cart"  },
                    new Function() {Id = "BILL",Name = "Đơn đặt",ParentId = "ORDER",SortOrder = 1,Status = Status.Active,URL = "/admin/bill/index",IconCss = "fa-chevron-down"  },
                    new Function() {Id = "BILLCOMPLETED",Name = "Hóa đơn",ParentId = "ORDER",SortOrder =2,Status = Status.Active,URL = "/admin/BillCompleted/index",IconCss = "fa-chevron-down"  },
                    new Function() {Id = "CONTENT",Name = "Nội dung",ParentId = null,SortOrder = 3,Status = Status.InActive,URL = "/",IconCss = "fa-table"  },
                    new Function() {Id = "BLOG",Name = "Bài viết",ParentId = "CONTENT",SortOrder = 1,Status = Status.InActive,URL = "/admin/blog/index",IconCss = "fa-table"  },
                    new Function() {Id = "PAGE",Name = "Page",ParentId = "CONTENT",SortOrder = 2,Status = Status.InActive,URL = "/admin/page/index",IconCss = "fa-table"  },
                    new Function() {Id = "UTILITY",Name = "Tiện ích",ParentId = null,SortOrder = 10,Status = Status.InActive,URL = "/",IconCss = "fa-clone"  },
                    new Function() {Id = "FOOTER",Name = "Footer",ParentId = "UTILITY",SortOrder = 1,Status = Status.InActive,URL = "/admin/footer/index",IconCss = "fa-clone"  },
                    new Function() {Id = "FEEDBACK",Name = "Phản hồi",ParentId = "UTILITY",SortOrder = 2,Status = Status.InActive,URL = "/admin/feedback/index",IconCss = "fa-clone"  },
                    new Function() {Id = "CONTACT",Name = "Liên hệ",ParentId = "UTILITY",SortOrder = 4,Status = Status.InActive,URL = "/admin/contact/index",IconCss = "fa-clone"  },
                    new Function() {Id = "SLIDE",Name = "Slide",ParentId = "UTILITY",SortOrder = 5,Status = Status.InActive,URL = "/admin/slide/index",IconCss = "fa-clone"  },
                    new Function() {Id = "PLACE",Name = "Địa điểm",ParentId = "TOUR",SortOrder = 6,Status = Status.Active,URL = "/admin/place/index",IconCss = "fa-clone"  },
                });
            }

            if (_context.Footers.Count(x => x.Id == CommonConstants.DefaultFooterId) == 0)
            {
                string content = "Footer";
                _context.Footers.Add(new Footer()
                {
                    Id = CommonConstants.DefaultFooterId,
                    Content = content
                });
            }
            if (_context.Slides.Count() == 0)
            {
                List<Slide> slides = new List<Slide>()
                {
                    new Slide() {Name="Slide 1",Image="/client-side/images/slider/hunterxliteknit__2__ae41075f51b944ae96985c83d79182f2_master.jpg",Url="#",DisplayOrder = 0,GroupAlias = "top",Status = true },
                    new Slide() {Name="Slide 2",Image="/client-side/images/slider/marvel_48e314d4c1b946ae9dac5fe0bb0323af_master.jpg",Url="#",DisplayOrder = 1,GroupAlias = "top",Status = true },
                    new Slide() {Name="Slide 3",Image="/client-side/images/slider/redpride_5ee3db376b6048a49e6066589a7cf053_master.jpg",Url="#",DisplayOrder = 2,GroupAlias = "top",Status = true },

                    new Slide() {Name="Slide 1",Image="/client-side/images/brand1.png",Url="#",DisplayOrder = 1,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 2",Image="/client-side/images/brand2.png",Url="#",DisplayOrder = 2,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 3",Image="/client-side/images/brand3.png",Url="#",DisplayOrder = 3,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 4",Image="/client-side/images/brand4.png",Url="#",DisplayOrder = 4,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 5",Image="/client-side/images/brand5.png",Url="#",DisplayOrder = 5,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 6",Image="/client-side/images/brand6.png",Url="#",DisplayOrder = 6,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 7",Image="/client-side/images/brand7.png",Url="#",DisplayOrder = 7,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 8",Image="/client-side/images/brand8.png",Url="#",DisplayOrder = 8,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 9",Image="/client-side/images/brand9.png",Url="#",DisplayOrder = 9,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 10",Image="/client-side/images/brand10.png",Url="#",DisplayOrder = 10,GroupAlias = "brand",Status = true },
                    new Slide() {Name="Slide 11",Image="/client-side/images/brand11.png",Url="#",DisplayOrder = 11,GroupAlias = "brand",Status = true },
                };
                _context.Slides.AddRange(slides);
            }

            if (_context.TourCategories.Count() == 0)
            {
                List<TourCategory> listTourCategory = new List<TourCategory>()
                {
                    new TourCategory() { Name="Đà Lạt",SeoAlias="da-lat",ParentId = null,Status=Status.Active,SortOrder=1,HomeFlag = true, HomeOrder = 1,
                        Tours = new List<Tour>()
                        {
                            new Tour(){Name = "Cần thơ - Đà lạt 3 ngày 3 đêm",Image="/uploaded/images/20200522/tour-du-lich-da-lat-4-ngay-3-dem.png",SeoAlias = "tour-1",Price = 1000000,Status = Status.Active,OriginalPrice = 800000,PromotionPrice = 0, DateCreated = DateTime.Now, DateModified = DateTime.Now, Seat = 10, SeatAvailability = 10, Duration = 10, Like = 1, HomeFlag = true, HotFlag = true, ViewCount = 0},
                        }
                    },
                    new TourCategory() { Name="Đà nẵng",SeoAlias="da-nang",ParentId = null,Status=Status.Active ,SortOrder=2,HomeFlag = true, HomeOrder = 1,
                        Tours = new List<Tour>()
                        {
                            new Tour(){Name = "Siêu hấp dẫn Đà nẵng trong 7 ngày",Image="/uploaded/images/20200522/tour-du-lich-da-lat-4-ngay-3-dem.png",SeoAlias = "tour-6",Price = 1000000,Status = Status.Active,OriginalPrice = 700000,PromotionPrice = 0, DateCreated = DateTime.Now, DateModified = DateTime.Now, Seat = 10, SeatAvailability = 10, Duration = 10, Like = 1, HomeFlag = true, HotFlag = true, ViewCount = 0,},
                        }}
                };
                _context.TourCategories.AddRange(listTourCategory);
            }

            if (!_context.SystemConfigs.Any(x => x.Id == "HomeTitle"))
            {
                _context.SystemConfigs.Add(new SystemConfig()
                {
                    Id = "HomeTitle",
                    Name = "Tiêu đề trang chủ",
                    Value1 = "Trang chủ",
                    Status = Status.Active
                });
            }
            if (!_context.SystemConfigs.Any(x => x.Id == "HomeMetaKeyword"))
            {
                _context.SystemConfigs.Add(new SystemConfig()
                {
                    Id = "HomeMetaKeyword",
                    Name = "Từ khoá trang chủ",
                    Value1 = "Trang chủ",
                    Status = Status.Active
                });
            }
            if (!_context.SystemConfigs.Any(x => x.Id == "HomeMetaDescription"))
            {
                _context.SystemConfigs.Add(new SystemConfig()
                {
                    Id = "HomeMetaDescription",
                    Name = "Mô tả trang chủ",
                    Value1 = "Trang chủ",
                    Status = Status.Active
                });
            }
            if (_context.Places.Count() == 0)
            {
                _context.Places.Add(new Place()
                {
                   Name = "Đà lạt",
                   DateCreated = DateTime.Now,
                   DateModified = DateTime.Now,
                   Status = Status.Active,
                   Image = "uploaded/images/20201015/tour-nha-trang-tet-2020-11103.jpg"
                });
                _context.Places.Add(new Place()
                {
                    Name = "Cần Thơ",
                    DateCreated = DateTime.Now,
                    DateModified = DateTime.Now,
                    Status = Status.Active,
                    Image = "uploaded/images/20201015/tour-nha-trang-tet-2020-11103.jpg"
                });
            }

            await _context.SaveChangesAsync();
        }
    }
}