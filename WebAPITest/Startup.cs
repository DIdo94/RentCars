using Hangfire;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(CarRental.WebApi.Startup))]

namespace CarRental.WebApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseHangfireServer();
            app.UseHangfireDashboard();
            ConfigureAuth(app);
            app.MapSignalR();
        }
    }
}
