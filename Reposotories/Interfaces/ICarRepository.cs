using CarRental.Models;
using CarRental.Models.RequestModels;
using System.Collections.Generic;

namespace CarRental.Data.Interfaces
{
    public interface ICarRepository
    {
        IEnumerable<Car> GetAll();

        CarsFilterResult GetAll(CarsFilterCrireria criteria);

        Car GetById(string id);

        bool RentCar(Car car);

        IEnumerable<Brand> GetBrands();

        bool AddCar(Car car);

        bool EditCar(Car car);

        bool RemoveCar(Car car);

        bool SetCarStatusAvailable(Car car);
    }
}
