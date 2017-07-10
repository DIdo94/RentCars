using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace Models
{
    public class Brand
    {
        public Brand()
        {
            Models = new List<Model>();
        }

        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("models")]
        public IEnumerable<Model> Models { get; set; }
    }
}