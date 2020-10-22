using Travel.Data.Entities;
using Travel.Data.IRepositories;

namespace Travel.Data.EF.Repositories
{
    public class BillCompletedDetailRepository : EFRepository<BillCompletedDetail, int>, IBillCompletedDetailRepository
    {
        public BillCompletedDetailRepository(AppDbContext context) : base(context)
        {
        }
    }
}