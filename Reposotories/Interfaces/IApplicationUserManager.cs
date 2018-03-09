using CarRental.Models;
using CarRental.Models.RequestModels;

namespace CarRental.Data.Interfaces
{
    public interface IApplicationUserManager
    {
        UsersFilterResult GetAllUsers(UsersFilterCriteria criteria);

        ApplicationUser GetUserById(string userId);

        bool AddUserRentalHistory(string userId, Car car);

        RentalHistoriesResult GetUserRentalHistories(string userId, RentalHistoriesFilterCriteria criteria);
    }
}
