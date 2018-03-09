using CarRental.Common;
using CarRental.Models;
using CarRental.Models.PaymentModels;
using CarRental.Models.RequestModels;
using CarRental.Services.Interfaces;
using CarRental.WebApi.Hubs;
using CarRental.WebApi.ViewModels.Car;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using PayPal.Api;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CarRental.WebApi.Controllers
{
    [RoutePrefix("api/cars")]
    [System.Web.Http.Authorize]
    public class CarsController : ApiController
    {
        private readonly ICarService _carService;
        private readonly IHubContext _carHub;
        private readonly IPaymentService _paymentService;
        private IUserService _userService;

        public CarsController(ICarService carService, IUserService userService, IPaymentService paymentService)
        {
            _carService = carService;
            _userService = userService;
            _carHub = GlobalHost.ConnectionManager.GetHubContext<CarHub>();
            _paymentService = paymentService;
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

            if (ModelState.IsValid)
            {
                try
                {
                    car.RentedUntil = carViewModel.RentedUntil;
                    Payment payment = _paymentService.CreatePayment(car, AppConstants.AngularSiteUrl);
                    if (_paymentService.AddPaymentHistory(payment, car, User.Identity.GetUserId()))
                    {
                        var url = payment.GetApprovalUrl();
                        return Ok(url);
                    }

                    return BadRequest();
                }
                catch (System.Exception)
                {
                    return InternalServerError();
                }
            }

            return BadRequest();
        }

        [Route("rent/paymentSuccessful")]
        [HttpPost]
        public IHttpActionResult RentSuccess([FromBody]PaymentDetailsRequest paymentDetailsRequest)
        {
            Payment paymentHistory = _paymentService.GetPaymentByPaymentId(paymentDetailsRequest.PaymentId);
            if (paymentHistory == null || paymentHistory.state != AppConstants.CreatedState)
            {
                return BadRequest();
            }

            PaymentRentInfo paymentDetails = _paymentService.GetPaymentRentInfoByPaymentId(paymentDetailsRequest.PaymentId);
            if (paymentDetails == null)
            {
                return BadRequest();
            }

            Car car = _carService.GetCarById(paymentDetails.CarId);
            if (car == null)
            {
                return BadRequest();
            }

            if (_carService.RentCar(car))
            {
                try
                {
                    car.RentedUntil = paymentDetails.RentedUntil;
                    _userService.AddUserRentalHistory(User.Identity.GetUserId(), car);
                    _paymentService.ExecutePayment(paymentDetailsRequest.PaymentId, paymentDetailsRequest.PayerId);
                    string carObject = JsonConvert.SerializeObject(car, new JsonSerializerSettings
                    {
                        ContractResolver = new CamelCasePropertyNamesContractResolver()
                    });
                    _carHub.Clients.All.carUpdated(carObject);

                    return Ok();
                }
                catch (System.Exception)
                {

                    return InternalServerError();
                }
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
            if (ModelState.IsValid)
            {
                Car car = new Car()
                {
                    Model = carViewModel.Model,
                    Brand = carViewModel.Brand,
                    MainImage = carViewModel.MainImage,
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

            return BadRequest(ModelState);
        }

        [System.Web.Http.Authorize(Roles = Roles.ADMIN)]
        [Route("{carId}")]
        [HttpPut]
        public IHttpActionResult EditCar([FromUri]string carId, [FromBody]CarEditViewModel carViewModel)
        {
            Car car = _carService.GetCarById(carId);
            if (car == null)
            {
                return BadRequest();
            }

            if (ModelState.IsValid)
            {
                car.Model = carViewModel.Model;
                car.Brand = carViewModel.Brand;
                car.MainImage = carViewModel.MainImage;
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

            return BadRequest(ModelState);
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
