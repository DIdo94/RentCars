using Models;
using Services.Interfaces;
using System;
using System.Web.Http;
using System.Web.Http.Cors;
using WebAPITest.ViewModels;

namespace WebAPITest.Controllers
{
    [RoutePrefix("api/cars")]
    [EnableCors(origins: "http://localhost:63409/", headers: "*", methods: "*")]
    [Authorize]
    public class CarsController : ApiController
    {
        private readonly ICarService _carService;
        public CarsController()
        {
            //_carService = new CarService(new CarsRepository());
        }
        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet]
        public IHttpActionResult Index()
        {
            var cars = _carService.GetAllCars();
            return Ok(cars);
        }

        [Route("rent/{carId}")]
        [HttpPut]
        public IHttpActionResult RentCar([FromUri]string carId, [FromBody]Car car)
        {
            var dbCar = _carService.GetCarById(carId);
            if (dbCar == null)
            {
                return BadRequest();
            }
            //var carObject = Newtonsoft.Json.JsonConvert.DeserializeObject<Car>(car);
            dbCar.RentedFrom = car.RentedFrom;
            dbCar.RentedUntil = car.RentedUntil;
            dbCar.Status = car.Status;
            bool isAck = _carService.RentCar(dbCar);
            if (isAck)
            {
                return Ok();
            }

            return BadRequest();
        }

        [Route("brands")]
        [HttpGet]
        public IHttpActionResult GetBrands()
        {
            var brands = _carService.GetAllBrands();
            return Ok(brands);
        }

        //[Route("/")]
        [HttpPost]
        public IHttpActionResult AddCar([FromBody]CarViewModel carViewModel)
        {
            Car car = new Car()
            {
                Id = carViewModel.Id,
                Model = carViewModel.Model,
                Brand = carViewModel.Brand,
                ImageUrl = carViewModel.ImageUrl,
                NumberOfDoors = carViewModel.NumberOfDoors,
                NumberOfSeats = carViewModel.NumberOfSeats,
                Status = carViewModel.Status
            };
            bool isAck = _carService.EditCar(car);
            if (isAck)
            {
                return Ok();
            }

            return BadRequest();
        }

        [Route("{carId}")]
        [HttpPut]
        public IHttpActionResult EditCar([FromUri]string carId, [FromBody]CarViewModel carViewModel)
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
            bool isAck = _carService.EditCar(car);
            if (isAck)
            {
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

            var isAck = _carService.RemoveCar(car);
            return Ok();
        }
    }
}
