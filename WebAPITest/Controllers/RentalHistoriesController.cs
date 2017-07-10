using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPITest.Controllers
{
    [RoutePrefix("api/rentalHitories")]
    [Authorize]
    public class RentalHistoriesController : ApiController
    {
        private readonly IRentalHistoryService _rentalHistoriesService;

        public RentalHistoriesController(IRentalHistoryService rentalHistoriesService)
        {
            _rentalHistoriesService = rentalHistoriesService;
        }

        [HttpGet]
        public IHttpActionResult GetRentalHitories()
        {
            var rentalHistories = _rentalHistoriesService.GetAllRentalHistory();
            return Ok(rentalHistories);
        }
    }
}