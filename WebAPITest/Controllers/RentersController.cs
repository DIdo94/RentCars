using Microsoft.AspNet.Identity.Owin;
using Services.Interfaces;
using System.Net.Http;
using System.Web.Http;

namespace WebAPITest.Controllers
{
    [RoutePrefix("api/renters")]
    [Authorize]
    public class RentersController : ApiController
    {
        //private readonly IUserService _userService;
        private ApplicationUserManager _userManager;

        public RentersController()
        {
            
        }

        public RentersController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
        }

        public ApplicationUserManager UserManager
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
        public IHttpActionResult GetRenters()
        {
            var users = UserManager.GetAll(Request.GetOwinContext());
            return Ok(users);
        }

        [HttpGet]
        [Route("{userId}")]
        public IHttpActionResult GetRentalHitories([FromUri] string userId)
        {
            var user = UserManager.FindByIdAsync(userId).Result;
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(user.RentalHistories);
        }
    }
}