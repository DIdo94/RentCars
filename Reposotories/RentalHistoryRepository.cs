using Data.Interfaces;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using Models;
using System;

namespace Data
{
    public class RentalHistoryRepository : IRentalHistoryRepository
    {
        private RentalCarsContext _context;

        public RentalHistoryRepository()
        {
            _context = new RentalCarsContext();
        }

        public RentalHistory GetByUserId(string userId)
        {
            throw new NotImplementedException();
        }
    }
}
