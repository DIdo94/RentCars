using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Services.Interfaces;
using Microsoft.AspNet.SignalR.Hubs;

namespace WebAPITest.Hubs
{
    [HubName("carHub")]
    public class CarHub : Hub
    {
    }
}