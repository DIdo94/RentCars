using Models;
using System;

namespace WebAPITest.ViewModels
{
    public class CarEditViewModel
    {
        public string Id { get; set; }

        public Brand Brand { get; set; }

        public Model Model { get; set; }

        public Status Status { get; set; }

        public City City { get; set; }

        public int NumberOfDoors { get; set; }

        public int NumberOfSeats { get; set; }

        public DateTime? RentedFrom { get; set; }

        public DateTime? RentedUntil { get; set; }

        public string ImageUrl { get; set; }
    }
}
