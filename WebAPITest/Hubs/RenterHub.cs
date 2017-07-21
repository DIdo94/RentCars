using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace WebAPITest.Hubs
{
    [HubName("renterHub")]
    public class RenterHub : Hub
    {
    }
}