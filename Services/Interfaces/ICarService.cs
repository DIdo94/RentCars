using Models;
using Models.RequestModels;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface ICarService
    {
        IEnumerable<Car> GetAllCars();

        CarsFilterResult GetAllCars(CarsFilterCrireria criteria);

        Car GetCarById(string id);

        bool RentCar(Car car);

        IEnumerable<Brand> GetAllBrands();

        bool EditCar(Car car);

        bool RemoveCar(Car car);

        bool AddCar(Car car);

        bool SetCarStatusAvailable(Car car);
    }
}
