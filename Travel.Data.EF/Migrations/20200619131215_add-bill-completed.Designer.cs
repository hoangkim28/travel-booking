﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;
using Travel.Data.EF;
using Travel.Data.Enums;

namespace Travel.Data.EF.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20200619131215_add-bill-completed")]
    partial class addbillcompleted
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<Guid>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<Guid>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<Guid>("UserId");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasAlternateKey("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId");

                    b.Property<Guid>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasAlternateKey("RoleId", "UserId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.HasAlternateKey("UserId");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Travel.Data.Entities.AppRole", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Description")
                        .HasMaxLength(250);

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Travel.Data.Entities.AppUser", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("Address");

                    b.Property<string>("Avatar");

                    b.Property<DateTime?>("BirthDay");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FullName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<int>("Status");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Travel.Data.Entities.Bill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BillStatus");

                    b.Property<string>("CustomerAddress")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("CustomerEmail")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<Guid?>("CustomerId");

                    b.Property<string>("CustomerMessage")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("CustomerMobile")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<int>("PaymentMethod");

                    b.Property<int>("Status");

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.ToTable("Bills");
                });

            modelBuilder.Entity("Travel.Data.Entities.BillCompleted", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CustomerAddress")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("CustomerEmail")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<Guid?>("CustomerId");

                    b.Property<string>("CustomerMessage")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("CustomerMobile")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("CustomerName")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<int>("PaymentMethod");

                    b.Property<Guid?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.ToTable("BillCompleteds");
                });

            modelBuilder.Entity("Travel.Data.Entities.BillCompletedDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BillId");

                    b.Property<decimal>("Price");

                    b.Property<int>("Quantity");

                    b.Property<int>("TourId");

                    b.HasKey("Id");

                    b.HasIndex("BillId");

                    b.HasIndex("TourId");

                    b.ToTable("BillCompletedDetails");
                });

            modelBuilder.Entity("Travel.Data.Entities.BillDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BillId");

                    b.Property<decimal>("Price");

                    b.Property<int>("Quantity");

                    b.Property<int>("TourId");

                    b.HasKey("Id");

                    b.HasIndex("BillId");

                    b.HasIndex("TourId");

                    b.ToTable("BillDetails");
                });

            modelBuilder.Entity("Travel.Data.Entities.Blog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<string>("Description")
                        .HasMaxLength(500);

                    b.Property<bool?>("HomeFlag");

                    b.Property<bool?>("HotFlag");

                    b.Property<string>("Image")
                        .HasMaxLength(256);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256);

                    b.Property<string>("SeoAlias")
                        .HasMaxLength(256);

                    b.Property<string>("SeoDescription")
                        .HasMaxLength(256);

                    b.Property<string>("SeoKeywords")
                        .HasMaxLength(256);

                    b.Property<string>("SeoPageTitle")
                        .HasMaxLength(256);

                    b.Property<int>("Status");

                    b.Property<string>("Tags");

                    b.Property<int?>("ViewCount");

                    b.HasKey("Id");

                    b.ToTable("Blogs");
                });

            modelBuilder.Entity("Travel.Data.Entities.BlogTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BlogId");

                    b.Property<string>("TagId")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.HasIndex("BlogId");

                    b.HasIndex("TagId");

                    b.ToTable("BlogTags");
                });

            modelBuilder.Entity("Travel.Data.Entities.Contact", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255);

                    b.Property<string>("Address")
                        .HasMaxLength(250);

                    b.Property<string>("Email")
                        .HasMaxLength(250);

                    b.Property<double?>("Lat");

                    b.Property<double?>("Lng");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.Property<string>("Other");

                    b.Property<string>("Phone")
                        .HasMaxLength(50);

                    b.Property<int>("Status");

                    b.Property<string>("Website")
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.ToTable("ContactDetails");
                });

            modelBuilder.Entity("Travel.Data.Entities.Feedback", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<string>("Email")
                        .HasMaxLength(250);

                    b.Property<string>("Message")
                        .HasMaxLength(500);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("Feedbacks");
                });

            modelBuilder.Entity("Travel.Data.Entities.Footer", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("varchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("Content")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Footers");
                });

            modelBuilder.Entity("Travel.Data.Entities.Function", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("IconCss");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<string>("ParentId")
                        .HasMaxLength(128);

                    b.Property<int>("SortOrder");

                    b.Property<int>("Status");

                    b.Property<string>("URL")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.HasKey("Id");

                    b.ToTable("Functions");
                });

            modelBuilder.Entity("Travel.Data.Entities.Language", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("IsDefault");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<string>("Resources");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("Languages");
                });

            modelBuilder.Entity("Travel.Data.Entities.Page", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255);

                    b.Property<string>("Alias")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("Content");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("Pages");
                });

            modelBuilder.Entity("Travel.Data.Entities.Permission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<bool>("CanCreate");

                    b.Property<bool>("CanDelete");

                    b.Property<bool>("CanRead");

                    b.Property<bool>("CanUpdate");

                    b.Property<string>("FunctionId")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<Guid>("RoleId");

                    b.HasKey("Id");

                    b.HasIndex("FunctionId");

                    b.HasIndex("RoleId");

                    b.ToTable("Permissions");
                });

            modelBuilder.Entity("Travel.Data.Entities.Place", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<string>("Description")
                        .HasMaxLength(255);

                    b.Property<string>("Image")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("Places");
                });

            modelBuilder.Entity("Travel.Data.Entities.Slide", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<string>("Description")
                        .HasMaxLength(255);

                    b.Property<int?>("DisplayOrder");

                    b.Property<string>("GroupAlias")
                        .IsRequired()
                        .HasMaxLength(25);

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<bool>("Status");

                    b.Property<string>("Url")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.ToTable("Slides");
                });

            modelBuilder.Entity("Travel.Data.Entities.SystemConfig", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128);

                    b.Property<int>("Status");

                    b.Property<string>("Value1");

                    b.Property<int?>("Value2");

                    b.Property<bool?>("Value3");

                    b.Property<DateTime?>("Value4");

                    b.Property<decimal?>("Value5");

                    b.HasKey("Id");

                    b.ToTable("SystemConfigs");
                });

            modelBuilder.Entity("Travel.Data.Entities.Tag", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("Id");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("Travel.Data.Entities.Tour", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<string>("Code")
                        .HasMaxLength(50);

                    b.Property<string>("Content");

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<DateTime>("Departure")
                        .HasColumnType("Date");

                    b.Property<string>("Description")
                        .HasMaxLength(255);

                    b.Property<int>("Duration");

                    b.Property<bool?>("HomeFlag");

                    b.Property<bool?>("HotFlag");

                    b.Property<string>("Image")
                        .HasMaxLength(255);

                    b.Property<int>("Like");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<decimal>("OriginalPrice");

                    b.Property<decimal>("Price");

                    b.Property<decimal?>("PromotionPrice");

                    b.Property<int>("Seat");

                    b.Property<int>("SeatAvailability");

                    b.Property<string>("SeoAlias")
                        .HasColumnType("varchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("SeoDescription")
                        .HasMaxLength(255);

                    b.Property<string>("SeoKeywords")
                        .HasMaxLength(255);

                    b.Property<string>("SeoPageTitle")
                        .HasMaxLength(255);

                    b.Property<int>("Status");

                    b.Property<string>("Tags")
                        .HasMaxLength(255);

                    b.Property<int?>("ViewCount");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Tours");
                });

            modelBuilder.Entity("Travel.Data.Entities.TourCategory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<DateTime>("DateModified");

                    b.Property<string>("Description")
                        .HasMaxLength(255);

                    b.Property<bool?>("HomeFlag");

                    b.Property<int?>("HomeOrder");

                    b.Property<string>("Image")
                        .HasMaxLength(255);

                    b.Property<string>("Name");

                    b.Property<int?>("ParentId");

                    b.Property<string>("SeoAlias")
                        .HasColumnType("varchar(255)")
                        .HasMaxLength(255);

                    b.Property<string>("SeoDescription")
                        .HasMaxLength(255);

                    b.Property<string>("SeoKeywords")
                        .HasMaxLength(255);

                    b.Property<string>("SeoPageTitle")
                        .HasMaxLength(255);

                    b.Property<int>("SortOrder");

                    b.Property<int>("Status");

                    b.HasKey("Id");

                    b.ToTable("TourCategories");
                });

            modelBuilder.Entity("Travel.Data.Entities.TourImage", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Caption")
                        .HasMaxLength(250);

                    b.Property<string>("Path")
                        .HasMaxLength(250);

                    b.Property<int>("TourId");

                    b.HasKey("Id");

                    b.HasIndex("TourId");

                    b.ToTable("TourImages");
                });

            modelBuilder.Entity("Travel.Data.Entities.TourPlace", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Depart");

                    b.Property<int>("Destination");

                    b.Property<string>("OrtherPlace")
                        .HasMaxLength(255);

                    b.Property<int>("TourId");

                    b.HasKey("Id");

                    b.HasIndex("Depart");

                    b.HasIndex("TourId");

                    b.ToTable("TourPlaces");
                });

            modelBuilder.Entity("Travel.Data.Entities.TourTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("TagId")
                        .IsRequired()
                        .HasColumnType("varchar(50)")
                        .HasMaxLength(50);

                    b.Property<int>("TourId");

                    b.HasKey("Id");

                    b.HasIndex("TagId");

                    b.HasIndex("TourId");

                    b.ToTable("TourTags");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.HasOne("Travel.Data.Entities.AppRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.HasOne("Travel.Data.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.HasOne("Travel.Data.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.HasOne("Travel.Data.Entities.AppRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Travel.Data.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.HasOne("Travel.Data.Entities.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Travel.Data.Entities.Bill", b =>
                {
                    b.HasOne("Travel.Data.Entities.AppUser", "AppUser")
                        .WithMany()
                        .HasForeignKey("CustomerId");
                });

            modelBuilder.Entity("Travel.Data.Entities.BillCompleted", b =>
                {
                    b.HasOne("Travel.Data.Entities.AppUser", "AppUser")
                        .WithMany()
                        .HasForeignKey("CustomerId");
                });

            modelBuilder.Entity("Travel.Data.Entities.BillCompletedDetail", b =>
                {
                    b.HasOne("Travel.Data.Entities.BillCompleted", "BillCompleted")
                        .WithMany("BillCompletedDetails")
                        .HasForeignKey("BillId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Travel.Data.Entities.Tour", "Tour")
                        .WithMany()
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Travel.Data.Entities.BillDetail", b =>
                {
                    b.HasOne("Travel.Data.Entities.Bill", "Bill")
                        .WithMany("BillDetails")
                        .HasForeignKey("BillId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Travel.Data.Entities.Tour", "Tour")
                        .WithMany()
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Travel.Data.Entities.BlogTag", b =>
                {
                    b.HasOne("Travel.Data.Entities.Blog", "Blog")
                        .WithMany("BlogTags")
                        .HasForeignKey("BlogId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Travel.Data.Entities.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Travel.Data.Entities.Permission", b =>
                {
                    b.HasOne("Travel.Data.Entities.Function", "Function")
                        .WithMany()
                        .HasForeignKey("FunctionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Travel.Data.Entities.AppRole", "AppRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Travel.Data.Entities.Tour", b =>
                {
                    b.HasOne("Travel.Data.Entities.TourCategory", "TourCategory")
                        .WithMany("Tours")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Travel.Data.Entities.TourImage", b =>
                {
                    b.HasOne("Travel.Data.Entities.Tour", "Tour")
                        .WithMany()
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Travel.Data.Entities.TourPlace", b =>
                {
                    b.HasOne("Travel.Data.Entities.Place", "DepartFrom")
                        .WithMany()
                        .HasForeignKey("Depart")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Travel.Data.Entities.Tour")
                        .WithMany("TourPlaces")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Travel.Data.Entities.TourTag", b =>
                {
                    b.HasOne("Travel.Data.Entities.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Travel.Data.Entities.Tour", "Tour")
                        .WithMany("TourTags")
                        .HasForeignKey("TourId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
