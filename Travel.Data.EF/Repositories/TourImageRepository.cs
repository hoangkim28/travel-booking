using Travel.Data.Entities;
using Travel.Data.IRepositories;

namespace Travel.Data.EF.Repositories
{
    public class TourImageRepository : EFRepository<TourImage, int>, ITourImageRepository
    {
        public TourImageRepository(AppDbContext context) : base(context)
        {
        }
    }
}