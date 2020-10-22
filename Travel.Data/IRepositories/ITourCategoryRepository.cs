using System.Collections.Generic;
using Travel.Data.Entities;
using Travel.Infrastructure.Interfaces;

namespace Travel.Data.IRepositories
{
    public interface ITourCategoryRepository : IRepository<TourCategory, int>
    {
        List<TourCategory> GetByAlias(string alias);
    }
}