using AspNet.Identity.MongoDB;
using Data;
using Data.Interfaces;
using LightInject;
using Models;
using Newtonsoft.Json;
using Reposotories.Interfaces;
using Services;
using Services.Interfaces;

namespace WebAPITest
{
    internal class LightInjectConfig : ICompositionRoot
    {
        RentalCarsContext _context = new RentalCarsContext();
        public void Compose(IServiceRegistry serviceRegistry)
        {
            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new SignalRContractResolver();
            var serializer = JsonSerializer.Create(settings);
            serviceRegistry.Register<ICarRepository, CarsRepository>();
            serviceRegistry.Register<IUserService, UserService>();
            serviceRegistry.Register<ICarService, CarService>();
            serviceRegistry.RegisterConstructorDependency<IApplicationUserManager>((factory, parameterInfo) =>
                new ApplicationUserManager(new UserStore<ApplicationUser>(_context.Users)));
        }
    }
}