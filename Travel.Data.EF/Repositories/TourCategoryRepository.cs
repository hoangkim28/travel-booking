using System.Collections.Generic;
using System.Linq;
using Travel.Data.Entities;
using Travel.Data.IRepositories;

namespace Travel.Data.EF.Repositories
{
    public class TourCategoryRepository : EFRepository<TourCategory, int>, ITourCategoryRepository
    {
        private AppDbContext _context;

        public TourCategoryRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public List<TourCategory> GetByAlias(string alias)
        {
            return _context.TourCategories.Where(x => x.SeoAlias == alias).ToList();
        }
    }
}