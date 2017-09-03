using Data.Interfaces;
using Models;
using Services.Interfaces;
using System.Collections.Generic;
using System;
using Models.RequestModels;

namespace Services
{
    public class CarService : ICarService
    {
        private ICarRepository _carReposotory;

        public CarService(ICarRepository carRepository)
        {
            _carReposotory = carRepository;
        }

        public bool AddCar(Car car)
        {
            return _carReposotory.AddCar(car);
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

        public CarsFilterResult GetAllCars(CarsFilterCrireria criteria)
        {
            return _carReposotory.GetAll(criteria);
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

        public bool SetCarStatusAvailable(Car car)
        {
            return _carReposotory.SetCarStatusAvailable(car);
        }
    }
}
