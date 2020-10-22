using Travel.Data.Entities;
using Travel.Infrastructure.Interfaces;

namespace Travel.Data.IRepositories
{
    public interface IBlogRepository : IRepository<Blog, int>
    {
    }
}