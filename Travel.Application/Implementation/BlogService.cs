﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using System.Collections.Generic;
using System.Linq;
using Travel.Application.Interfaces;
using Travel.Application.ViewModels.Blog;
using Travel.Application.ViewModels.Common;
using Travel.Data.Entities;
using Travel.Data.Enums;
using Travel.Data.IRepositories;
using Travel.Infrastructure.Interfaces;
using Travel.Utilities.Constants;
using Travel.Utilities.Dtos;
using Travel.Utilities.Helpers;

namespace Travel.Application.Implementation
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        private readonly ITagRepository _tagRepository;
        private readonly IBlogTagRepository _blogTagRepository;
        private readonly IUnitOfWork _unitOfWork;

        public BlogService(IBlogRepository blogRepository,
            IBlogTagRepository blogTagRepository,
            ITagRepository tagRepository,
            IUnitOfWork unitOfWork)
        {
            _blogRepository = blogRepository;
            _blogTagRepository = blogTagRepository;
            _tagRepository = tagRepository;
            _unitOfWork = unitOfWork;
        }

        public BlogViewModel Add(BlogViewModel blogVm)
        {
            var blog = Mapper.Map<BlogViewModel, Blog>(blogVm);

            if (!string.IsNullOrEmpty(blog.Tags))
            {
                var tags = blog.Tags.Split(',');
                foreach (string t in tags)
                {
                    var tagId = TextHelper.ToUnsignString(t);
                    if (!_tagRepository.FindAll(x => x.Id == tagId).Any())
                    {
                        Tag tag = new Tag
                        {
                            Id = tagId,
                            Name = t,
                            Type = CommonConstants.BlogTag
                        };
                        _tagRepository.Add(tag);
                    }

                    var blogTag = new BlogTag { TagId = tagId };
                    blog.BlogTags.Add(blogTag);
                }
            }
            _blogRepository.Add(blog);
            return blogVm;
        }

        public void Delete(int id)
        {
            _blogRepository.Remove(id);
        }

        public List<BlogViewModel> GetAll()
        {
            return _blogRepository.FindAll(c => c.BlogTags)
                .ProjectTo<BlogViewModel>().ToList();
        }

        public PagedResult<BlogViewModel> GetAllPaging(string keyword, int pageSize, int page)
        {
            var query = _blogRepository.FindAll();
            if (!string.IsNullOrEmpty(keyword))
                query = query.Where(x => x.Name.Contains(keyword));

            int totalRow = query.Count();
            var data = query.OrderByDescending(x => x.DateCreated)
                .Skip((page - 1) * pageSize)
                .Take(pageSize);

            var paginationSet = new PagedResult<BlogViewModel>()
            {
                Results = data.ProjectTo<BlogViewModel>().ToList(),
                CurrentPage = page,
                RowCount = totalRow,
                PageSize = pageSize,
            };

            return paginationSet;
        }

        public BlogViewModel GetById(int id)
        {
            return Mapper.Map<Blog, BlogViewModel>(_blogRepository.FindById(id));
        }

        public void Save()
        {
            _unitOfWork.Commit();
        }

        public void Update(BlogViewModel blog)
        {
            _blogRepository.Update(Mapper.Map<BlogViewModel, Blog>(blog));
            if (!string.IsNullOrEmpty(blog.Tags))
            {
                string[] tags = blog.Tags.Split(',');
                foreach (string t in tags)
                {
                    var tagId = TextHelper.ToUnsignString(t);
                    if (!_tagRepository.FindAll(x => x.Id == tagId).Any())
                    {
                        Tag tag = new Tag
                        {
                            Id = tagId,
                            Name = t,
                            Type = CommonConstants.BlogTag
                        };
                        _tagRepository.Add(tag);
                    }
                    _blogTagRepository.RemoveMultiple(_blogTagRepository.FindAll(x => x.Id == blog.Id).ToList());
                    BlogTag blogTag = new BlogTag
                    {
                        BlogId = blog.Id,
                        TagId = tagId
                    };
                    _blogTagRepository.Add(blogTag);
                }
            }
        }

        public List<BlogViewModel> GetLastest(int top)
        {
            return _blogRepository.FindAll(x => x.Status == Status.Active).OrderByDescending(x => x.DateCreated)
                .Take(top).ProjectTo<BlogViewModel>().ToList();
        }

        public List<BlogViewModel> GetHotBlog(int top)
        {
            return _blogRepository.FindAll(x => x.Status == Status.Active && x.HotFlag == true)
                .OrderByDescending(x => x.ViewCount)
                .OrderByDescending(x => x.DateCreated)
                .Take(top)
                .ProjectTo<BlogViewModel>()
                .ToList();
        }

        public List<BlogViewModel> GetListPaging(int page, int pageSize, string sort, out int totalRow)
        {
            var query = _blogRepository.FindAll(x => x.Status == Status.Active);

            switch (sort)
            {
                case "popular":
                    query = query.OrderByDescending(x => x.ViewCount);
                    break;

                default:
                    query = query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            totalRow = query.Count();

            return query.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ProjectTo<BlogViewModel>().ToList();
        }

        public List<string> GetListByName(string name)
        {
            return _blogRepository.FindAll(x => x.Status == Status.Active
            && x.Name.Contains(name)).Select(y => y.Name).ToList();
        }

        public List<BlogViewModel> Search(string keyword, int page, int pageSize, string sort, out int totalRow)
        {
            var query = _blogRepository.FindAll(x => x.Status == Status.Active
            && x.Name.Contains(keyword));

            switch (sort)
            {
                case "popular":
                    query = query.OrderByDescending(x => x.ViewCount);
                    break;

                default:
                    query = query.OrderByDescending(x => x.DateCreated);
                    break;
            }

            totalRow = query.Count();

            return query.Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ProjectTo<BlogViewModel>()
                .ToList();
        }

        public List<BlogViewModel> GetReatedBlogs(int id, int top)
        {
            return _blogRepository.FindAll(x => x.Status == Status.Active
                && x.Id != id)
            .OrderByDescending(x => x.DateCreated)
            .Take(top)
            .ProjectTo<BlogViewModel>()
            .ToList();
        }

        public List<TagViewModel> GetListTagById(int id)
        {
            return _blogTagRepository.FindAll(x => x.BlogId == id, c => c.Tag)
                .Select(y => y.Tag)
                .ProjectTo<TagViewModel>()
                .ToList();
        }

        public void IncreaseView(int id)
        {
            var Tour = _blogRepository.FindById(id);
            if (Tour.ViewCount.HasValue)
                Tour.ViewCount += 1;
            else
                Tour.ViewCount = 1;
        }

        public List<BlogViewModel> GetListByTag(string tagId, int page, int pageSize, out int totalRow)
        {
            var query = from p in _blogRepository.FindAll()
                        join pt in _blogTagRepository.FindAll()
                        on p.Id equals pt.BlogId
                        where pt.TagId == tagId && p.Status == Status.Active
                        orderby p.DateCreated descending
                        select p;

            totalRow = query.Count();

            query = query.Skip((page - 1) * pageSize).Take(pageSize);

            var model = query
                .ProjectTo<BlogViewModel>();
            return model.ToList();
        }

        public TagViewModel GetTag(string tagId)
        {
            return Mapper.Map<Tag, TagViewModel>(_tagRepository.FindSingle(x => x.Id == tagId));
        }

        public List<BlogViewModel> GetList(string keyword)
        {
            var query = !string.IsNullOrEmpty(keyword) ?
                _blogRepository.FindAll(x => x.Name.Contains(keyword)).ProjectTo<BlogViewModel>()
                : _blogRepository.FindAll().ProjectTo<BlogViewModel>();
            return query.ToList();
        }

        public List<TagViewModel> GetListTag(string searchText)
        {
            return _tagRepository.FindAll(x => x.Type == CommonConstants.TourTag
            && searchText.Contains(x.Name)).ProjectTo<TagViewModel>().ToList();
        }
    }
}