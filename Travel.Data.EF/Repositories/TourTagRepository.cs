using Travel.Data.Entities;
using Travel.Data.IRepositories;

namespace Travel.Data.EF.Repositories
{
    public class TourTagRepository : EFRepository<TourTag, int>, ITourTagRepository
    {
        public TourTagRepository(AppDbContext context) : base(context)
        {
        }
    }
}