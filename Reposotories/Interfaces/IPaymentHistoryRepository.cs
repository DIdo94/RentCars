using CarRental.Models;

namespace CarRental.Data.Interfaces
{
    public interface IPaymentHistoryRepository
    {
        bool AddPaymentRentInfo(PaymentRentInfo paymentRentInfo);

        PaymentRentInfo GetPaymentRentInfoByPaymentId(string paymentId);
    }
}
