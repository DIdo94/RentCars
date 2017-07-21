﻿using Models;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IUserService
    {
        IEnumerable<ApplicationUser> GetAllUsers();

        ApplicationUser GetUserById(string userId);
    }
}
