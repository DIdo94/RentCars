using Models;
using MongoDB.Driver;
using System.Configuration;

namespace Data
{
    public class RentalCarsContext
    {
        private readonly IMongoClient _client;
        private readonly IMongoDatabase _database;
        private IMongoCollection<Car> _cars;
        private IMongoCollection<Brand> _brands;
        private IMongoCollection<User> _users;
        private IMongoCollection<RentalHistory> _rentalHistories;

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

        //public IMongoCollection<User> Users
        //{
        //    get
        //    {
        //        return _database.GetCollection<User>("users");
        //    }
        //    set
        //    {
        //        _users = value;
        //    }
        //}

        public IMongoCollection<RentalHistory> RentalHistories
        {
            get
            {
                return _database.GetCollection<RentalHistory>("RentalHistories");
            }
            set
            {
                _rentalHistories = value;
            }
        }
    }
}
