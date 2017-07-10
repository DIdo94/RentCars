using System;
using Data;
using Data.Interfaces;
using LightInject;
using Services;
using Services.Interfaces;

namespace WebAPITest
{
    internal class LightInjectConfig : ICompositionRoot
    {

        public void Compose(IServiceRegistry serviceRegistry)
        {
           // serviceRegistry.Register<IUserRepository, UsersRepository>();
            serviceRegistry.Register<ICarRepository, CarsRepository>();
            serviceRegistry.Register<IRentalHistoryRepository, RentalHistoryRepository>();

           // serviceRegistry.Register<IUserService, UserService>();
            serviceRegistry.Register<ICarService, CarService>();
            serviceRegistry.Register<IRentalHistoryService, RentalHistoryService>();
        }
    }
}