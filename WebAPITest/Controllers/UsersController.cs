using Models;
using Models.RequestModels;
using Reposotories.Interfaces;
using System.Web.Http;

namespace WebAPITest.Controllers
{
    [RoutePrefix("api/users")]
    [Authorize(Roles = Roles.ADMIN)]
    public class UsersController : ApiController
    {
        private IApplicationUserManager _userManager;

        public UsersController(IApplicationUserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public IHttpActionResult GetUsers([FromUri]UsersFilterCriteria criteria)
        {
            var users = _userManager.GetAllUsers(criteria);
            return Ok(users);
        }

        [HttpGet]
        [Route("{userId}/rentalHistories")]
        public IHttpActionResult GetUserRentalHistories([FromUri] string userId, [FromUri] RentalHistoriesFilterCriteria criteria)
        {
            ApplicationUser user = _userManager.GetUserById(userId);
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(_userManager.GetUserRentalHistories(userId, criteria));
        }
    }
}