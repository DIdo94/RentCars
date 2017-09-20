using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;

namespace CarRental.Models
{
    public class Car
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("brand")]
        public Brand Brand { get; set; }

        [BsonElement("model")]
        public Model Model { get; set; }

        [BsonElement("licenseNumber")]
        public string LicenseNumber { get; set; }

        [BsonElement("status")]
        [JsonConverter(typeof(StringEnumConverter))]
        public Status Status { get; set; }

        [BsonElement("city")]
        public City City { get; set; }

        [BsonElement("numberOfDoors")]
        public int NumberOfDoors { get; set; }

        [BsonElement("numberOfSeats")]
        public int NumberOfSeats { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        [BsonElement("rentedFrom")]
        public DateTime? RentedFrom { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        [BsonElement("rentedUntil")]
        public DateTime? RentedUntil { get; set; }

        [BsonElement("mainImage")]
        public string MainImage { get; set; }
    }
}
