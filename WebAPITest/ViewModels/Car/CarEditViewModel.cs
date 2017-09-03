using Models;

namespace WebAPITest.ViewModels.Car
{
    public class CarEditViewModel
    {
        public string Id { get; set; }

        public Brand Brand { get; set; }

        public Model Model { get; set; }

        public City City { get; set; }

        public int NumberOfDoors { get; set; }

        public int NumberOfSeats { get; set; }

        public string ImageUrl { get; set; }
    }
}
