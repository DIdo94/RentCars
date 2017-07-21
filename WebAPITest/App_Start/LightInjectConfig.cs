using Data;
using Data.Interfaces;
using LightInject;
using Services;
using Services.Interfaces;
using Reposotories.Interfaces;
using Microsoft.AspNet.Identity;
using AspNet.Identity.MongoDB;
using Models;
using Newtonsoft.Json;

namespace WebAPITest
{
    internal class LightInjectConfig : ICompositionRoot
    {

        public void Compose(IServiceRegistry serviceRegistry)
        {
            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new SignalRContractResolver();
            var serializer = JsonSerializer.Create(settings);

            // serviceRegistry.Register<IUserRepository, UsersRepository>();
            serviceRegistry.Register<ICarRepository, CarsRepository>();
            serviceRegistry.Register<IRentalHistoryRepository, RentalHistoryRepository>();

            // serviceRegistry.Register<IUserService, UserService>();
            serviceRegistry.Register<ICarService, CarService>();
            serviceRegistry.Register<IRentalHistoryService, RentalHistoryService>();
            //serviceRegistry.Register<IUserStore<ApplicationUser>, UserStore<ApplicationUser>>((factory, store) => factory.GetInstance<UserStore<ApplicationUser>());
            serviceRegistry.Register<IApplicationUserManager, ApplicationUserManager>((factory, manager) => factory.GetInstance<ApplicationUserManager>());
        }
    }
}