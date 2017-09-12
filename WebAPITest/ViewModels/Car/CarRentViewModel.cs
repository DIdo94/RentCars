using System;
using System.ComponentModel.DataAnnotations;

namespace WebAPITest.ViewModels.Car
{
    public class CarRentViewModel
    {
        [Required]
        public DateTime RentedUntil { get; set; }
    }
}