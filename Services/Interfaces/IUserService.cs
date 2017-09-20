using CarRental.Models;
using CarRental.Models.RequestModels;

namespace CarRental.Services.Interfaces
{
    public interface IUserService
    {
        UsersFilterResult GetAllUsers(UsersFilterCriteria criteria);

        ApplicationUser GetUserById(string userId);

        RentalHistoriesResult GetUserRentalHistories(string userId, RentalHistoriesFilterCriteria criteria);

        bool AddUserRentalHistory(string userId, Car car);
    }
}
