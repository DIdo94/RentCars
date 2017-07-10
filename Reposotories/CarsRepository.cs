using Data.Interfaces;
using System.Collections.Generic;
using System.Linq;
using Models;
using MongoDB.Driver;
using System;
using MongoDB.Bson;

namespace Data
{
    public class CarsRepository : ICarRepository
    {
        private RentalCarsContext _context;
        public CarsRepository()
        {
            _context = new RentalCarsContext();
        }

        public bool AddCar(Car car)
        {
            car.Id = ObjectId.GenerateNewId().ToString();
            _context.Cars.InsertOne(car);
            return true;
        }

        public bool EditCar(Car car)
        {
            _context.Cars.ReplaceOne(model => model.Id == car.Id, car);
            return true;
        }

        public IEnumerable<Car> GetAll()
        {
            var cars = _context.Cars.AsQueryable().ToEnumerable();
            return cars;
        }

        public IEnumerable<Brand> GetBrands()
        {
            return _context.Brands.AsQueryable().ToEnumerable();
        }

        public Car GetById(string id)
        {
            return _context.Cars.AsQueryable().FirstOrDefault(c => c.Id == id);
        }

        public bool RemoveCar(Car car)
        {
            DeleteResult deleteResult = _context.Cars.DeleteOne(c => c.Id == car.Id);
            return deleteResult.IsAcknowledged;
        }

        public bool RentCar(Car car)
        {
            var update = Builders<Car>.Update
                .Set(c => c.RentedUntil, car.RentedUntil)
                .Set(c => c.RentedFrom, car.RentedFrom)
                .Set(c => c.Status, car.Status);
           UpdateResult updateResult = _context.Cars.UpdateOne(model => model.Id == car.Id, update);
           return updateResult.IsAcknowledged;
        }
    }
}
