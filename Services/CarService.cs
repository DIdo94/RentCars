using Data.Interfaces;
using Models;
using Services.Interfaces;
using System.Collections.Generic;
using System;

namespace Services
{
    public class CarService : ICarService
    {
        private ICarRepository _carReposotory;

        public CarService(ICarRepository carRepository)
        {
            _carReposotory = carRepository;
        }

        public bool EditCar(Car car)
        {
            return _carReposotory.EditCar(car);
        }

        public IEnumerable<Brand> GetAllBrands()
        {
            return _carReposotory.GetBrands();
        }

        public IEnumerable<Car> GetAllCars()
        {
            return _carReposotory.GetAll();
        }

        public Car GetCarById(string id)
        {
            return _carReposotory.GetById(id);
        }

        public bool RemoveCar(Car car)
        {
            return _carReposotory.RemoveCar(car);
        }

        public bool RentCar(Car car)
        {
            return _carReposotory.RentCar(car);
        }
    }
}
