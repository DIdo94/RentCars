using Models;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<User> GetAllUsers();

        User GetUserById(string id);
    }
}
