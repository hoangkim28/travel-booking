using Travel.Data.Entities;
using Travel.Infrastructure.Interfaces;

namespace Travel.Data.IRepositories
{
    public interface ITourRepository : IRepository<Tour, int>
    {
    }
}