using Travel.Data.Entities;
using Travel.Infrastructure.Interfaces;

namespace Travel.Data.IRepositories
{
    public interface IPermissionRepository : IRepository<Permission, int>
    {
    }
}