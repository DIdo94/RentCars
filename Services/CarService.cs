using CarRental.Data.Interfaces;
using CarRental.Models;
using CarRental.Services.Interfaces;
using System.Collections.Generic;
using CarRental.Models.RequestModels;

namespace CarRental.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _carReposotory;
        private readonly IPaymentService _paymentService;

        public CarService(ICarRepository carRepository, IPaymentService paymentService)
        {
            _carReposotory = carRepository;
            _paymentService = paymentService;
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
