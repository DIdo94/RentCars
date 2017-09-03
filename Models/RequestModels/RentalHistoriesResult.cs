using System.Collections.Generic;

namespace Models.RequestModels
{
    public class RentalHistoriesResult
    {
        public IEnumerable<RentalHistory> RentalHistories { get; set; }

        public int TotalItems { get; set; }
    }
}
