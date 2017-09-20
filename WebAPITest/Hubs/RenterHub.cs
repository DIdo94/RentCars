using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace CarRental.WebApi.Hubs
{
    [HubName("renterHub")]
    public class RenterHub : Hub
    {
    }
}