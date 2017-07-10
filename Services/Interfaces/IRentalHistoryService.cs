using Models;
using MongoDB.Bson;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IRentalHistoryService
    {
        IEnumerable<RentalHistory> GetAllRentalHistory();

        RentalHistory GetRentalHistoryById(string id);
    }
}
