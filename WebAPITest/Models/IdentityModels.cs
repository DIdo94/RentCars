using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using AspNet.Identity.MongoDB;
using Microsoft.AspNet.Identity.Owin;
using MongoDB.Driver;
using System.Configuration;
using System;
using System.Collections;
using System.Collections.Generic;
using Models;
using MongoDB.Bson.Serialization.Attributes;

namespace WebAPITest.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [BsonIgnoreIfNull]
        public DateTime DateOfBirth { get; set; }

        public string ImageUrl { get; set; }

        public IEnumerable<RentalHistory> RentalHistories { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IDisposable
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;
        private IMongoCollection<ApplicationUser> _users;

        public ApplicationDbContext()
        {
            _client = new MongoClient(ConfigurationManager.ConnectionStrings["RentalCarsConnectionString"].ConnectionString);
            _database = _client.GetDatabase("RentalCars");
        }

        public IMongoCollection<ApplicationUser> Users
        {
            get
            {
                return _database.GetCollection<ApplicationUser>("Users");
            }
            set
            {
                _users = value;
            }
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public void Dispose()
        {
            //
        }
    }
}