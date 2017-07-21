using Data;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.SignalR;
using Models;
using MongoDB.Bson;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Services;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using WebAPITest.Hubs;
using WebAPITest.ViewModels;

namespace WebAPITest.Controllers
{
    [RoutePrefix("api/cars")]
    [System.Web.Http.Authorize]
    public class CarsController : ApiController
    {
        private readonly ICarService _carService;
        private readonly IHubContext _carHub;
        private IRentalHistoryService _rentalHistoryService;

        public CarsController()
        {

        }

        public CarsController(ICarService carService)
        {
            _carService = carService;
            //_rentalHistoryService = rentalHistoryService;          
            _carHub = GlobalHost.ConnectionManager.GetHubContext<CarHub>();
        }

        public IRentalHistoryService RentalHistoryService
        {
            get
            {
                return _rentalHistoryService ?? new RentalHistoryService(Request.GetOwinContext().GetUserManager<ApplicationUserManager>());
            }
            private set
            {
                _rentalHistoryService = value;
            }
        }

        [HttpGet]
        public IHttpActionResult Index()
        {
            var cars = _carService.GetAllCars();
            return Ok(cars);
        }

        [Route("rent/{carId}")]
        [HttpPut]
        public IHttpActionResult RentCar([FromUri]string carId, [FromBody]CarRentViewModel car)
        {
            Car dbCar = _carService.GetCarById(carId);
            if (dbCar == null)
            {
                return BadRequest();
            }

            dbCar.RentedUntil = car.RentedUntil;
            dbCar.Status = car.Status;
            if (_carService.RentCar(dbCar))
            {
                if (!RentalHistoryService.AddRentalHistory(User.Identity.GetUserId(), dbCar))
                {
                    return BadRequest();
                }

                string carObject = JsonConvert.SerializeObject(dbCar, new JsonSerializerSettings
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

        [HttpPost]
        public IHttpActionResult AddCar([FromBody]CarAddViewModel carViewModel)
        {
            Car car = new Car()
            {
                Model = carViewModel.Model,
                Brand = carViewModel.Brand,
                ImageUrl = carViewModel.ImageUrl,
                NumberOfDoors = carViewModel.NumberOfDoors,
                NumberOfSeats = carViewModel.NumberOfSeats,
                Status = carViewModel.Status
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
            car.Status = carViewModel.Status;
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
