using Data.Interfaces;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using Models;

namespace Data
{
    public class RentalHistoryRepository : IRentalHistoryRepository
    {
        private RentalCarsContext _context;

        public RentalHistoryRepository()
        {
            _context = new RentalCarsContext();
        }
        public IEnumerable<RentalHistory> GetAll()
        {
            return _context.RentalHistories.AsQueryable().ToEnumerable();
        }

        public RentalHistory GetById(string id)
        {
            return _context.RentalHistories.AsQueryable().FirstOrDefault(rh => rh.Id == id);
        }
    }
}
