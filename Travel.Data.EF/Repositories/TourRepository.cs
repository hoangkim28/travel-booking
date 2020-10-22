using Travel.Data.Entities;
using Travel.Data.IRepositories;

namespace Travel.Data.EF.Repositories
{
    public class TourRepository : EFRepository<Tour, int>, ITourRepository
    {
        public TourRepository(AppDbContext context) : base(context)
        {
        }
    }
}