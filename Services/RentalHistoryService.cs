using Services.Interfaces;
using System.Collections.Generic;
using Models;
using MongoDB.Bson;
using Data.Interfaces;

namespace Services
{
    public class RentalHistoryService : IRentalHistoryService
    {
        IRentalHistoryRepository _rentalHistoryRepository; 

        public RentalHistoryService(IRentalHistoryRepository rentalHistoryRepository)
        {
            _rentalHistoryRepository = rentalHistoryRepository;
        }

        public IEnumerable<RentalHistory> GetAllRentalHistory()
        {
            return _rentalHistoryRepository.GetAll();
        }

        public RentalHistory GetRentalHistoryById(string id)
        {
            return _rentalHistoryRepository.GetById(id);
        }
    }
}
