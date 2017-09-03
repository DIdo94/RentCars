using Microsoft.AspNet.Identity;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Client.Http;
using Models;
using Models.RequestModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Services.Interfaces;
using System.Collections.Generic;
using System.Web.Http;
using WebAPITest.Hubs;
using WebAPITest.ViewModels.Car;

namespace WebAPITest.Controllers
{
    [RoutePrefix("api/cars")]
    [System.Web.Http.Authorize]
    public class CarsController : ApiController
    {
        private readonly ICarService _carService;
        private readonly IHubContext _carHub;
        private IUserService _userService;

        public CarsController(ICarService carService, IUserService userService)
        {
            _carService = carService;
            _userService = userService;
            _carHub = GlobalHost.ConnectionManager.GetHubContext<CarHub>();
        }

        [HttpGet]
        public IHttpActionResult GetAllCars([FromUri]CarsFilterCrireria criteria)
        {
            CarsFilterResult cars = _carService.GetAllCars(criteria);
            return Ok(cars);
        }

        [Route("rent/{carId}")]
        [HttpPut]
        public IHttpActionResult RentCar([FromUri]string carId, [FromBody]CarRentViewModel carViewModel)
        {
            Car car = _carService.GetCarById(carId);
            if (car == null)
            {
                return BadRequest();
            }

            car.RentedUntil = carViewModel.RentedUntil;
            if (_carService.RentCar(car))
            {
                _userService.AddUserRentalHistory(User.Identity.GetUserId(), car);
                string carObject = JsonConvert.SerializeObject(car, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
                _carHub.Clients.All.carUpdated(carObject);

                return Ok();
            }

            return BadRequest();
        }

        [Route("brands")]
        [HttpGet]
        public IHttpActionResult GetBrands()
        {
            IEnumerable<Brand> brands = _carService.GetAllBrands();
            return Ok(brands);
        }

        [System.Web.Http.Authorize(Roles = Roles.ADMIN)]
        [HttpPost]
        public IHttpActionResult AddCar([FromBody]CarAddViewModel carViewModel)
        {
            Car car = new Car()
            {
                Model = carViewModel.Model,
                Brand = carViewModel.Brand,
                ImageUrl = carViewModel.ImageUrl,
                NumberOfDoors = carViewModel.NumberOfDoors,
                NumberOfSeats = carViewModel.NumberOfSeats
            };
            if (_carService.AddCar(car))
            {
                string carObject = JsonConvert.SerializeObject(car, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
                _carHub.Clients.All.carAdded(carObject);
                return Ok();
            }

            return BadRequest();
        }

        [System.Web.Http.Authorize(Roles = Roles.ADMIN)]
        [Route("{carId}")]
        [HttpPut]
        public IHttpActionResult EditCar([FromUri]string carId, [FromBody]CarEditViewModel carViewModel)
        {
            Car car = _carService.GetCarById(carViewModel.Id);
            if (car == null)
            {
                return BadRequest();
            }

            car.Model = carViewModel.Model;
            car.Brand = carViewModel.Brand;
            car.ImageUrl = carViewModel.ImageUrl;
            car.NumberOfDoors = carViewModel.NumberOfDoors;
            car.NumberOfSeats = carViewModel.NumberOfSeats;
            if (_carService.EditCar(car))
            {
                var carObject = JsonConvert.SerializeObject(car, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });
                _carHub.Clients.All.carUpdated(carObject);
                return Ok();
            }

            return BadRequest();
        }

        [System.Web.Http.Authorize(Roles = Roles.ADMIN)]
        [Route("{carId}")]
        [HttpDelete]
        public IHttpActionResult RemoveCar([FromUri] string carId)
        {
            Car car = _carService.GetCarById(carId);
            if (car == null)
            {
                return BadRequest();
            }

            if (_carService.RemoveCar(car))
            {
                _carHub.Clients.All.carRemoved(carId);
                return Ok();
            }

            return BadRequest();
        }
    }
}
