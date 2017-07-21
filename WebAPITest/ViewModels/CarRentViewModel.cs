using Models;
using System;

namespace WebAPITest.ViewModels
{
    public class CarRentViewModel
    {
        public DateTime? RentedUntil { get; set; }

        public Status Status { get; set; }
    }
}