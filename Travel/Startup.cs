﻿using AutoMapper;
using Travel.Application.Dapper.Implementation;
using Travel.Application.Dapper.Interfaces;
using Travel.Application.Implementation;
using Travel.Application.Interfaces;
using Travel.Authorization;
using Travel.Data.EF;
using Travel.Data.EF.Repositories;
using Travel.Data.Entities;
using Travel.Data.IRepositories;
using Travel.Helpers;
using Travel.Infrastructure.Interfaces;
using Travel.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using System;

namespace Travel
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                o => o.MigrationsAssembly("Travel.Data.EF")));

            services.AddIdentity<AppUser, AppRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();
            services.AddMemoryCache();
            // Configure Identity
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                // Lockout settings
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
                options.Lockout.MaxFailedAccessAttempts = 10;

                // User settings
                options.User.RequireUniqueEmail = true;
            });
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(2);
                options.Cookie.HttpOnly = true;
            });
            services.AddAutoMapper();
            services.AddAuthentication()
                .AddFacebook(fbOpts =>{
                    fbOpts.AppId = "267936951066928";
                    fbOpts.AppSecret = "fa69478bd4daf33a3788efa030c30e0f";
                })
                .AddGoogle(ggOpts => {
                    ggOpts.ClientId = "355246919990-n6ce34beeg5oj9rce2pm9sae8cvv1osq.apps.googleusercontent.com";
                    ggOpts.ClientSecret = "vvvJxH5FhWMxnZOIhlwLTfD8";
                });
            // Add application services.
            services.AddScoped<UserManager<AppUser>, UserManager<AppUser>>();
            services.AddScoped<RoleManager<AppRole>, RoleManager<AppRole>>();

            services.AddSingleton(Mapper.Configuration);
            services.AddScoped<IMapper>(sp => new Mapper(sp.GetRequiredService<AutoMapper.IConfigurationProvider>(), sp.GetService));

            services.AddTransient<IEmailSender, EmailSender>();

            services.AddTransient<DbInitializer>();

            //Custom Claim
            services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, CustomClaimsPrincipalFactory>();
            services.AddTransient(typeof(IUnitOfWork), typeof(EFUnitOfWork));
            services.AddTransient(typeof(IRepository<,>), typeof(Data.EF.EFRepository<,>));
            //Repositories
            services.AddTransient<ITourCategoryRepository, TourCategoryRepository>();
            services.AddTransient<IFunctionRepository, FunctionRepository>();
            services.AddTransient<ITourRepository, TourRepository>();
            services.AddTransient<IPlaceRepository, PlaceRepository>();
            services.AddTransient<ITourPlaceRepository, TourPlaceRepository>();
            services.AddTransient<ITagRepository, TagRepository>();
            services.AddTransient<ITourTagRepository, TourTagRepository>();
            services.AddTransient<IPermissionRepository, PermissionRepository>();
            services.AddTransient<IBillRepository, BillRepository>();
            services.AddTransient<IBillDetailRepository, BillDetailRepository>();
            services.AddTransient<IBillCompletedRepository, BillCompletedRepository>();
            services.AddTransient<IBillCompletedDetailRepository, BillCompletedDetailRepository>();
            services.AddTransient<ITourImageRepository, TourImageRepository>();
            services.AddTransient<IBlogRepository, BlogRepository>();
            services.AddTransient<IBlogTagRepository, BlogTagRepository>();
            services.AddTransient<ISlideRepository, SlideRepository>();
            services.AddTransient<ISystemConfigRepository, SystemConfigRepository>();
            services.AddTransient<IFooterRepository, FooterRepository>();
            services.AddTransient<IFeedbackRepository, FeedbackRepository>();
            services.AddTransient<IContactRepository, ContactRepository>();
            services.AddTransient<IPageRepository, PageRepository>();
            //Services
            services.AddTransient<IReportService, ReportService>();
            services.AddTransient<IPageService, PageService>();
            services.AddTransient<IFeedbackService, FeedbackService>();
            services.AddTransient<IContactService, ContactService>();
            services.AddTransient<ITourCategoryService, TourCategoryService>();
            services.AddTransient<IFunctionService, FunctionService>();
            services.AddTransient<ITourService, TourService>();
            services.AddTransient<IPlaceService, PlaceService>();
            services.AddTransient<ITourPlaceService, TourPlaceService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IBillService, BillService>();
            services.AddTransient<IBillCompletedService, BillCompletedService>();
            services.AddTransient<IBlogService, BlogService>();
            services.AddTransient<ICommonService, CommonService>();
            services.AddTransient<IViewRenderService, ViewRenderService>();
            services.AddTransient<IAuthorizationHandler, BaseResourceAuthorizationHandler>();
            services.AddMvc(options =>
            {
                options.CacheProfiles.Add("Default",
                    new CacheProfile()
                    {
                        Duration = 60
                    });
                options.CacheProfiles.Add("Never",
                    new CacheProfile()
                    {
                        Location = ResponseCacheLocation.None,
                        NoStore = true
                    });
            })
                .AddJsonOptions(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddFile("Logs/Travel-{Date}.txt");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseSession();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                routes.MapRoute(
                    name: "areasRoute",
                    template: "{area:exists}/{controller=Home}/{action=Index}/{id?}");
            });

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                ForwardedHeaders.XForwardedProto
            });
        }
    }
}