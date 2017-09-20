using System.Collections.Generic;

namespace CarRental.Models.RequestModels
{
    public class CarsFilterResult
    {
        public IEnumerable<Car> Cars { get; set; }

        public int TotalItems { get; set; }
    }
}
