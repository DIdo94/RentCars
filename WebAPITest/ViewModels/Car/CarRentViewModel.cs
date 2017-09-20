using System;
using System.ComponentModel.DataAnnotations;

namespace CarRental.WebApi.ViewModels.Car
{
    public class CarRentViewModel
    {
        [Required]
        public DateTime RentedUntil { get; set; }
    }
}