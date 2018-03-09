using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace CarRental.Models
{
    public class PaymentRentInfo
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string PaymentId { get; set; }

        public string UserId { get; set; }

        public string CarId { get; set; }

        public DateTime RentedUntil { get; set; }
    }
}
