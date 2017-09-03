using Hangfire;
using Hangfire.Mongo;
using LightInject;
using Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;

namespace WebAPITest
{
    public class HangfireConfig
    {
        private static ServiceContainer _container;
        private static ICarService _carService;

        static HangfireConfig()
        {
            JobStorage.Current = GlobalConfiguration.Configuration.UseMongoStorage(
                ConfigurationManager.ConnectionStrings["RentalCarsConnectionString"].ConnectionString,
                "RentalCars");
            _container = new ServiceContainer();
            _container.RegisterFrom<LightInjectConfig>();
            _carService = _container.GetInstance<ICarService>();
        }

        public static void RegisterBackgroundJobs()
        {
            RecurringJob.AddOrUpdate(() => UpdateCarStatus(), Cron.Minutely);
        }

        public static void UpdateCarStatus()
        {
            IEnumerable<Car> cars = _carService.GetAllCars();
            DateTime now = DateTime.Now;
            foreach (Car car in cars)
            {
                if (car.Status == Status.Rented && car.RentedUntil < now)
                {
                    bool isAcknowledged = _carService.SetCarStatusAvailable(car);
                }
            }
        }
    }
}