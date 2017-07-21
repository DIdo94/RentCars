using Services.Interfaces;
using System.Collections.Generic;
using Models;
using Reposotories.Interfaces;
using System;
using Data;

namespace Services
{
    public class RentalHistoryService : IRentalHistoryService
    {
        private readonly IApplicationUserManager _userManager;

        public RentalHistoryService(IApplicationUserManager userManager)
        {
            _userManager = userManager;
        }

        public bool AddRentalHistory(string userId, Car car)
        {
            return _userManager.AddRentalHistory(userId, car);
        }

        public IEnumerable<RentalHistory> GetRentalHitoriesByUserId(string userId)
        {
            var user = _userManager.GetUserById(userId);
            if (user == null)
            {
                return null;
            }

            return user.RentalHistories;
        }
    }
}
