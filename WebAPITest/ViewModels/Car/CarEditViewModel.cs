using CarRental.Models;
using System.ComponentModel.DataAnnotations;

namespace CarRental.WebApi.ViewModels.Car
{
    public class CarEditViewModel
    {
        [Required]
        public Brand Brand { get; set; }

        [Required]
        public Model Model { get; set; }

        public City City { get; set; }

        [Required]
        [Range(2,4)]
        public int NumberOfDoors { get; set; }

        [Required]
        [Range(1,8)]
        public int NumberOfSeats { get; set; }

        [Required]
        public string MainImage { get; set; }
    }
}
