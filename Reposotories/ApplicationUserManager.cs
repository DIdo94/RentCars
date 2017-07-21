using AspNet.Identity.MongoDB;
using Data.Interfaces;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Models;
using MongoDB.Bson;
using MongoDB.Driver;
using Reposotories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Data
{
    public class ApplicationUserManager : UserManager<ApplicationUser>, IApplicationUserManager
    {
        private readonly RentalCarsContext _context;
        public ApplicationUserManager(IUserStore<ApplicationUser> store)
            : base(store)
        {
            _context = new RentalCarsContext();
        }

        public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context)
        {
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(context.Get<RentalCarsContext>().Users));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }

        public IEnumerable<ApplicationUser> GetAllUsers()
        {
            return _context.Users.AsQueryable().ToEnumerable();
        }

        public bool AddRentalHistory(string userId, Car car)
        {
            RentalHistory rentalHistory = new RentalHistory()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Brand = car.Brand,
                Model = car.Model,
                RentedFrom = DateTime.Now,
                RentedUntil = (DateTime)car.RentedUntil
            };
            ApplicationUser user = FindByIdAsync(userId).Result;
            user.RentalHistories.Add(rentalHistory);
            if (UpdateAsync(user).Result.Succeeded)
            {
                return true;
            }

            return false;
        }

        public ApplicationUser GetUserById(string userId)
        {
            return FindByIdAsync(userId).Result;
        }
    }
}
