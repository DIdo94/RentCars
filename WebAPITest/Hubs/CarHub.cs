using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace CarRental.WebApi.Hubs
{
    [HubName("carHub")]
    public class CarHub : Hub
    {
       
        public void CarAdded(string carObject)
        {
            Clients.AllExcept(Context.ConnectionId).carAdded(carObject);
        }
    }
}