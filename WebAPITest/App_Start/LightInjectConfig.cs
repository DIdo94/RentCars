using AspNet.Identity.MongoDB;
using CarRental.Data;
using CarRental.Data.Interfaces;
using CarRental.Models;
using CarRental.Services;
using CarRental.Services.Interfaces;
using LightInject;
using Newtonsoft.Json;

namespace CarRental.WebApi
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
            serviceRegistry.Register<IPaymentHistoryRepository, PaymentHistoryRepository>();

            serviceRegistry.Register<ICarService, CarService>();
            serviceRegistry.RegisterConstructorDependency<IApplicationUserManager>((factory, parameterInfo) =>
                new ApplicationUserManager(new UserStore<ApplicationUser>(_context.Users)));
            serviceRegistry.Register<IUserService, UserService>();
            serviceRegistry.Register<IPaymentService, PaymentService>();
        }
    }
}