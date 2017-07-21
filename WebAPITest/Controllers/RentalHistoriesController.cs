using Data;
using Microsoft.AspNet.Identity.Owin;
using Models;
using Reposotories.Interfaces;
using Services.Interfaces;
using System.Net.Http;
using System.Web.Http;

namespace WebAPITest.Controllers
{
    [RoutePrefix("api/rentalHistories")]
    [Authorize]
    public class RentalHistoriesController : ApiController
    {
        private readonly IRentalHistoryService _rentalHistoriesService;
        private IApplicationUserManager _userManager;

        public RentalHistoriesController(IRentalHistoryService rentalHistoriesService)
        {
            _rentalHistoriesService = rentalHistoriesService;

        }

        public IApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        [HttpGet]
        [Route("{userId}")]
        public IHttpActionResult GetRentalHitoriesByUserId([FromUri] string userId)
        {
            ApplicationUser user = UserManager.GetUserById(userId);
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(user.RentalHistories);
        }
    }
}