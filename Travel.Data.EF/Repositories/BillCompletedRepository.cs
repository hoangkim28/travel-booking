using Travel.Data.Entities;
using Travel.Data.IRepositories;

namespace Travel.Data.EF.Repositories
{
    public class BillCompletedRepository : EFRepository<BillCompleted, int>, IBillCompletedRepository
    {
        public BillCompletedRepository(AppDbContext context) : base(context)
        {
        }
    }
}