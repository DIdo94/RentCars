using CarRental.Data.Interfaces;
using CarRental.Models;
using CarRental.Models.RequestModels;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarRental.Data
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
            try
            {
                car.Id = ObjectId.GenerateNewId().ToString();
                car.Status = Status.Available;
                _context.Cars.InsertOne(car);
                return true;
            }
            catch (MongoWriteException)
            {

                return false;
            }

        }

        public bool EditCar(Car car)
        {
            ReplaceOneResult result = _context.Cars.ReplaceOne(model => model.Id == car.Id, car);
            return result.IsAcknowledged;
        }

        public IEnumerable<Car> GetAll()
        {
            return _context.Cars.AsQueryable().ToEnumerable();

        }

        public CarsFilterResult GetAll(CarsFilterCrireria criteria)
        {
            IQueryable<Car> cars = _context.Cars.AsQueryable();
            if (!string.IsNullOrEmpty(criteria.Brand?.Trim()))
            {
                // Case-insensitive string comparison is not supported as query string 
                string brandToLower = criteria.Brand.Trim().ToLower();
                cars = cars.Where(c => c.Brand.Name.ToLower().StartsWith(brandToLower));
            }

            if (!string.IsNullOrEmpty(criteria.Model?.Trim()))
            {
                string modelToLower = criteria.Model.Trim().ToLower();
                cars = cars.Where(c => c.Model.Name.ToLower().StartsWith(modelToLower));
            }

            if (criteria.Status != Status.All)
            {
                cars = cars.Where(c => c.Status == criteria.Status);
            }

            int totalItems = cars.Count();
            return new CarsFilterResult
            {
                Cars = cars.Skip((criteria.PageNumber - 1) * criteria.ItemsPerPage)
                    .Take(criteria.ItemsPerPage)
                    .AsEnumerable(),
                TotalItems = totalItems
            };
        }

        public IEnumerable<Brand> GetBrands()
        {
            return _context.Brands.AsQueryable().ToEnumerable();
        }

        public Car GetById(string id)
        {
            return _context.Cars.Find(c => c.Id == id).FirstOrDefault();
        }

        public bool RemoveCar(Car car)
        {
            DeleteResult deleteResult = _context.Cars.DeleteOne(c => c.Id == car.Id);
            return deleteResult.IsAcknowledged;
        }

        public bool RentCar(Car car)
        {
            car.RentedFrom = DateTime.Now;
            UpdateDefinition<Car> update = Builders<Car>.Update
               .Set(c => c.RentedUntil, car.RentedUntil)
               .Set(c => c.RentedFrom, car.RentedFrom)
               .Set(c => c.Status, Status.Rented);
            UpdateResult updateResult = _context.Cars.UpdateOne(model => model.Id == car.Id, update);
            return updateResult.IsAcknowledged;
        }

        public bool SetCarStatusAvailable(Car car)
        {
            UpdateDefinition<Car> update = Builders<Car>.Update
                .Set(c => c.Status, Status.Available)
                .Set(c => c.RentedUntil, null);
            UpdateResult updateResult = _context.Cars.UpdateOne(model => model.Id == car.Id, update);
            return updateResult.IsAcknowledged;
        }
    }
}
