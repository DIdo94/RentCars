﻿using Models;

namespace WebAPITest.ViewModels
{
    public class CarAddViewModel
    {
        public Brand Brand { get; set; }

        public Model Model { get; set; }

        public Status Status { get; set; }

        public City City { get; set; }

        public int NumberOfDoors { get; set; }

        public int NumberOfSeats { get; set; }

        public string ImageUrl { get; set; }
    }
}