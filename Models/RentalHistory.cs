using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Models
{
    public class RentalHistory
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public DateTime RentedFrom { get; set; }

        public DateTime RentedUntil { get; set; }

        public Brand Brand { get; set; }

        public Model Model { get; set; }
    }
}
