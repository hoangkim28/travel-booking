using Travel.Data.Entities;
using Travel.Infrastructure.Interfaces;

namespace Travel.Data.IRepositories
{
    public interface IBillRepository : IRepository<Bill, int>
    {
    }
}