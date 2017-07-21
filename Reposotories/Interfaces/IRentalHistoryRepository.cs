using Models;
using System.Collections.Generic;

namespace Data.Interfaces
{
    public interface IRentalHistoryRepository
    {
        RentalHistory GetByUserId(string userId);
    }
}
