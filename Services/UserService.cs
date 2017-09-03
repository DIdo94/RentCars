using Models;
using Models.RequestModels;
using Reposotories.Interfaces;
using Services.Interfaces;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly IApplicationUserManager _userManager;

        public UserService(IApplicationUserManager userManager)
        {
            _userManager = userManager;
        }
        public UsersFilterResult GetAllUsers(UsersFilterCriteria criteria)
        {
            return _userManager.GetAllUsers(criteria);
        }

        public ApplicationUser GetUserById(string userId)
        {
            return _userManager.GetUserById(userId);
        }

        public RentalHistoriesResult GetUserRentalHistories(string userId, RentalHistoriesFilterCriteria criteria)
        {
            return _userManager.GetUserRentalHistories(userId, criteria);
        }

        public bool AddUserRentalHistory(string userId, Car car)
        {
            return _userManager.AddUserRentalHistory(userId, car);
        }
    }
}
