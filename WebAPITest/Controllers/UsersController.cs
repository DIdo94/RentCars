using CarRental.Models;
using CarRental.Models.RequestModels;
using CarRental.Services.Interfaces;
using System.Web.Http;

namespace CarRental.WebApi.Controllers
{
    [RoutePrefix("api/users")]
    [Authorize(Roles = Roles.ADMIN)]
    public class UsersController : ApiController
    {
        private IUserService _userService;
        
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public IHttpActionResult GetUsers([FromUri] UsersFilterCriteria criteria)
        {
            var users = _userService.GetAllUsers(criteria);
            return Ok(users);
        }

        [HttpGet]
        [Route("{userId}/rentalHistories")]
        public IHttpActionResult GetUserRentalHistories([FromUri] string userId, [FromUri] RentalHistoriesFilterCriteria criteria)
        {
            ApplicationUser user = _userService.GetUserById(userId);
            if (user == null)
            {
                return BadRequest();
            }

            return Ok(_userService.GetUserRentalHistories(userId, criteria));
        }
    }
}