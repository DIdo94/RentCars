using Data;
using Microsoft.AspNet.Identity.Owin;
using Reposotories.Interfaces;
using System.Net.Http;
using System.Web.Http;

namespace WebAPITest.Controllers
{
    [RoutePrefix("api/renters")]
    [Authorize]
    public class RentersController : ApiController
    {
        private IApplicationUserManager _userManager;

        public RentersController()
        {
            
        }

        public RentersController(IApplicationUserManager userManager)
        {
            UserManager = userManager;
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
        public IHttpActionResult GetRenters()
        {
            var users = UserManager.GetAllUsers();
            return Ok(users);
        }
    }
}