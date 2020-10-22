using Travel.Data.Entities;
using Travel.Data.IRepositories;

namespace Travel.Data.EF.Repositories
{
    public class TourPlaceRepository : EFRepository<TourPlace, int>, ITourPlaceRepository
    {
        public TourPlaceRepository(AppDbContext context) : base(context)
        {
        }
    }
}