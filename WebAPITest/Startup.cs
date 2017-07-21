using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(WebAPITest.Startup))]

namespace WebAPITest
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
