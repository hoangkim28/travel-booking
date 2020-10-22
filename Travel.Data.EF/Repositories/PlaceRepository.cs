using Travel.Data.Entities;
using Travel.Data.IRepositories;

namespace Travel.Data.EF.Repositories
{
    public class PlaceRepository : EFRepository<Place, int>, IPlaceRepository
    {
        public PlaceRepository(AppDbContext context) : base(context)
        {
        }
    }
}