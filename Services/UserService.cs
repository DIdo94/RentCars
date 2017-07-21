using Services.Interfaces;
using System.Collections.Generic;
using Models;
using Reposotories.Interfaces;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly IApplicationUserManager _userManager;

        public UserService(IApplicationUserManager userManager)
        {
            _userManager = userManager;
        }
        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            return _userManager.GetAllUsers();
        }

        public ApplicationUser GetUserById(string userId)
        {
            return _userManager.GetUserById(userId);
        }
    }
}
