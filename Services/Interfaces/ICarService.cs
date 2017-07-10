using Models;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface ICarService
    {
        IEnumerable<Car> GetAllCars();

        Car GetCarById(string id);

        bool RentCar(Car car);

        IEnumerable<Brand> GetAllBrands();

        bool EditCar(Car car);

        bool RemoveCar(Car car);
    }
}
