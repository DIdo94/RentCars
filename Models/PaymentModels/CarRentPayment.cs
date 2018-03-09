using System;

namespace CarRental.Models.PaymentModels
{
    public class CarRentPayment
    {
        public string Description { get; set; }

        public string Intent { get; set; }

        public decimal SubtotalPrice { get; set; }

        public decimal TaxPercentage { get; set; }

        public decimal TotalPrice
        {
            get
            {
                return decimal.Round(SubtotalPrice + SubtotalPrice * TaxPercentage, 2, MidpointRounding.AwayFromZero);
            }
        }

        public string Currency { get; set; }

        public int Quantity { get; set; }

        public string Sku { get; set; }
    }
}
