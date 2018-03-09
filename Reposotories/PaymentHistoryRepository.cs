using CarRental.Data.Interfaces;
using CarRental.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarRental.Data
{
    public class PaymentHistoryRepository : IPaymentHistoryRepository
    {
        private readonly RentalCarsContext _context;

        public PaymentHistoryRepository()
        {
            _context = new RentalCarsContext();
        }


        public bool AddPaymentRentInfo(PaymentRentInfo paymentRentInfo)
        {
            try
            {
                paymentRentInfo.Id = ObjectId.GenerateNewId().ToString();
                _context.PaymentRentInfo.InsertOne(paymentRentInfo);
                return true;
            }
            catch (MongoWriteException)
            {

                return false;
            }
        }

        public PaymentRentInfo GetPaymentRentInfoByPaymentId(string paymentId)
        {
            return _context.PaymentRentInfo.Find(ph => ph.PaymentId == paymentId).SingleOrDefault();
        }
    }
}
