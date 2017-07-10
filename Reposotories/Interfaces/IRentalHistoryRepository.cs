using Models;
using MongoDB.Bson;
using System.Collections.Generic;

namespace Data.Interfaces
{
    public interface IRentalHistoryRepository
    {
        IEnumerable<RentalHistory> GetAll();

        RentalHistory GetById(string id);
    }
}
