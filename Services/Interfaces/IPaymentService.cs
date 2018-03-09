using CarRental.Models;
using PayPal.Api;
using System;

namespace CarRental.Services.Interfaces
{
    public interface IPaymentService
    {
        Payment CreatePayment(Car car, string baseUrl);

        Payment ExecutePayment(string paymentId, string payerId);

        bool AddPaymentHistory(Payment payment, Car car, string userId);

        Payment GetPaymentByPaymentId(string paymentId);

        PaymentRentInfo GetPaymentRentInfoByPaymentId(string paymentId);
    }
}
