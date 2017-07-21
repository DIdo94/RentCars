using Models;
using System.Collections.Generic;

namespace Reposotories.Interfaces
{
    public interface IApplicationUserManager
    {
        IEnumerable<ApplicationUser> GetAllUsers();

        ApplicationUser GetUserById(string userId);

        bool AddRentalHistory(string userId, Car car);
    }
}
