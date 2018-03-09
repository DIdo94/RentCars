using CarRental.Models;
using MongoDB.Driver;
using System;
using System.Configuration;

namespace CarRental.Data
{
    public class RentalCarsContext : IDisposable
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;
        private IMongoCollection<Car> _cars;
        private IMongoCollection<Brand> _brands;
        private IMongoCollection<ApplicationUser> _users;
        private IMongoCollection<PaymentRentInfo> _paymentRentInfo;

        public RentalCarsContext()
        {
            _client = new MongoClient(ConfigurationManager.ConnectionStrings["RentalCarsConnectionString"].ConnectionString);
            _database = _client.GetDatabase("RentalCars");
        }

        public IMongoCollection<Car> Cars
        {
            get
            {
                return _database.GetCollection<Car>("Cars");
            }
            set
            {
                _cars = value;
            }
        }

        public IMongoCollection<Brand> Brands
        {
            get
            {
                return _database.GetCollection<Brand>("Brands");
            }
            set
            {
                _brands = value;
            }
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

        public IMongoCollection<PaymentRentInfo> PaymentRentInfo
        {
            get
            {
                return _database.GetCollection<PaymentRentInfo>("PaymentRentInfo");
            }
            set
            {
                _paymentRentInfo = value;
            }
        }

        public static RentalCarsContext Create()
        {
            return new RentalCarsContext();
        }

        public void Dispose()
        {
            //
        }
    }
}
