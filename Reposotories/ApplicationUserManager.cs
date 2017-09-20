using AspNet.Identity.MongoDB;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using CarRental.Models;
using CarRental.Models.RequestModels;
using MongoDB.Bson;
using MongoDB.Driver;
using Reposotories.Interfaces;
using System;
using System.Linq;

namespace CarRental.Data
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

        public UsersFilterResult GetAllUsers(UsersFilterCriteria criteria)
        {
            IQueryable<ApplicationUser> users = _context.Users.AsQueryable();
            if (!string.IsNullOrEmpty(criteria.FirstName?.Trim()))
            {
                // Case-insensitive string comparison is not supported as query string 
                string firstNameToLower = criteria.FirstName.Trim().ToLower();
                users = users.Where(u => u.FirstName.ToLower().StartsWith(firstNameToLower));
            }

            if (!string.IsNullOrEmpty(criteria.LastName?.Trim()))
            {
                string lastNameToLower = criteria.LastName.Trim().ToLower();
                users = users.Where(u => u.LastName.ToLower().StartsWith(lastNameToLower));
            }

            int totalItems = users.Count();
            return new UsersFilterResult()
            {
                Users = users.Skip((criteria.PageNumber - 1) * criteria.ItemsPerPage).Take(criteria.ItemsPerPage),
                TotalItems = totalItems
            };
        }

        public bool AddUserRentalHistory(string userId, Car car)
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

        public RentalHistoriesResult GetUserRentalHistories(string userId, RentalHistoriesFilterCriteria criteria)
        {
            ApplicationUser user = GetUserById(userId);
            if (user == null)
            {
                return null;
            }

            IQueryable<RentalHistory> rentalHistories = user.RentalHistories.AsQueryable();
            if (!string.IsNullOrEmpty(criteria.Brand?.Trim()))
            {
                string brandToLower = criteria.Brand.Trim().ToLower();
                rentalHistories = rentalHistories.Where(rh => rh.Brand.Name.ToLower().StartsWith(brandToLower));
            }

            if (!string.IsNullOrEmpty(criteria.Model?.Trim()))
            {
                string modelToLower = criteria.Model.Trim().ToLower();
                rentalHistories = rentalHistories.Where(rh => rh.Model.Name.ToLower().StartsWith(modelToLower));
            }

            int totalItems = rentalHistories.Count();
            return new RentalHistoriesResult()
            {
                RentalHistories = rentalHistories.Skip((criteria.PageNumber - 1) * criteria.ItemsPerPage).Take(criteria.ItemsPerPage),
                TotalItems = totalItems
            };
        }
    }
}
