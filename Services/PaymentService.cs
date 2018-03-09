using CarRental.Common;
using CarRental.Data.Interfaces;
using CarRental.Models;
using CarRental.Models.PaymentModels;
using CarRental.Services.Interfaces;
using PayPal.Api;
using System;
using System.Collections.Generic;

namespace CarRental.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly APIContext _apiContext;
        private readonly IUserService _userService;
        private readonly IPaymentHistoryRepository _paymentHistoryRepository;
        private readonly Dictionary<string, string> _config;

        public PaymentService(IUserService userService, IPaymentHistoryRepository paymentHistoryRepository)
        {
            _apiContext = GetContext();
            _userService = userService;
            _paymentHistoryRepository = paymentHistoryRepository;
            _config = ConfigManager.Instance.GetProperties();
        }

        public Payment CreatePayment(Car car, string baseUrl)
        {
            CarRentPayment carPayment = new CarRentPayment
            {
                Currency = AppConstants.UsdCurrency,
                Description = string.Format(AppConstants.RentPaymentDescription, car.Brand.Name, car.Model.Name),
                Intent = AppConstants.SaleIntent,
                Quantity = 1,
                SubtotalPrice = CalculateSubtotalPrice(car),
                TaxPercentage = AppConstants.TaxPercentage,
                Sku = car.Sku
            };
            Payment payment = new Payment
            {
                intent = carPayment.Intent,
                payer = new Payer() { payment_method = AppConstants.PaypalPaymentMethod },
                transactions = GetTransactionsList(carPayment),
                redirect_urls = GetReturnUrls(baseUrl)
            };
            Payment createdPayment = payment.Create(_apiContext);
            return createdPayment;
        }

        public Payment ExecutePayment(string paymentId, string payerId)
        {
            PaymentExecution paymentExecution = new PaymentExecution() { payer_id = payerId };
            Payment payment = new Payment() { id = paymentId };
            Payment executedPayment = payment.Execute(_apiContext, paymentExecution);

            return executedPayment;
        }

        public bool AddPaymentHistory(Payment payment, Car car, string userId)
        {
            ApplicationUser user = _userService.GetUserById(userId);
            if (user == null)
            {
                return false;
            }

            PaymentRentInfo paymentRentInfo = new PaymentRentInfo
            {
                PaymentId = payment.id,
                RentedUntil = car.RentedUntil.Value,
                UserId = user.Id,
                CarId = car.Id
            };

            return _paymentHistoryRepository.AddPaymentRentInfo(paymentRentInfo);
        }

        public Payment GetPaymentByPaymentId(string paymentId)
        {
            return Payment.Get(_apiContext, paymentId);
        }

        public PaymentRentInfo GetPaymentRentInfoByPaymentId(string paymentId)
        {
            return _paymentHistoryRepository.GetPaymentRentInfoByPaymentId(paymentId);
        }

        private RedirectUrls GetReturnUrls(string baseUrl)
        {

            return new RedirectUrls()
            {
                cancel_url = baseUrl + AppConstants.RentCancelledEndpoint,
                return_url = baseUrl + AppConstants.RentSuccessfulEndpoint
            };
        }

        private List<Transaction> GetTransactionsList(CarRentPayment carPayment)
        {
            var transactionList = new List<Transaction>();
            transactionList.Add(new Transaction()
            {
                description = carPayment.Description,
                invoice_number = GetRandomInvoiceNumber(),
                amount = new Amount()
                {
                    currency = carPayment.Currency,
                    total = carPayment.TotalPrice.ToString(),
                    details = new Details()
                    {
                        tax = decimal.Round(carPayment.TaxPercentage * carPayment.SubtotalPrice, 2, MidpointRounding.AwayFromZero).ToString(),
                        subtotal = carPayment.SubtotalPrice.ToString()
                    }
                },
                item_list = new ItemList()
                {
                    items = new List<Item>()
                    {
                        new Item()
                        {
                            name = carPayment.Description,
                            currency = carPayment.Currency,
                            price = carPayment.SubtotalPrice.ToString(),
                            quantity = carPayment.Quantity.ToString(),
                            sku = carPayment.Sku
                        }
                    }
                }
            });
            return transactionList;
        }

        private APIContext GetContext()
        {
            var accessToken = new OAuthTokenCredential(_config).GetAccessToken();
            var apiContext = new APIContext(accessToken);
            return apiContext;
        }

        private string GetRandomInvoiceNumber()
        {
            return new Random().Next(999999).ToString();
        }

        private decimal CalculateSubtotalPrice(Car car)
        {
            car.RentedFrom = DateTime.UtcNow;
            double totalHours = (car.RentedUntil - car.RentedFrom).Value.TotalMinutes / 60;
            return decimal.Round(Convert.ToDecimal(car.RentPerHour * totalHours) / 100m, 2, MidpointRounding.AwayFromZero);
        }
    }
}
