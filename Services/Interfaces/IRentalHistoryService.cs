using Models;
using System.Collections.Generic;

namespace Services.Interfaces
{
    public interface IRentalHistoryService
    {
        IEnumerable<RentalHistory> GetRentalHitoriesByUserId(string userId);

        bool AddRentalHistory(string userId, Car car);
    }
}
