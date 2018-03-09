using System.Configuration;

namespace CarRental.Common
{
    public static class AppConstants
    {
        public static string AngularSiteUrl = ConfigurationManager.AppSettings["angularSiteUrl"];

        public static string CreatedState= "created";

        public static string UsdCurrency = "USD";

        public static string RentPaymentDescription = "Rent for {0} {1}";

        public static string SaleIntent = "sale";

        public static string PaypalPaymentMethod = "paypal";

        public static string RentSuccessfulEndpoint = ConfigurationManager.AppSettings["rentSuccessfulEndpoint"];

        public static string RentCancelledEndpoint = ConfigurationManager.AppSettings["rentCancelledEndpoint"];

        public static decimal TaxPercentage = 0.2m;
    }
}
