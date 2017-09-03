namespace Models.RequestModels
{
    public class CarsFilterCrireria : BaseFilterCriteria
    {
        public string Brand { get; set; }

        public string Model { get; set; }

        public Status Status { get; set; }
    }
}
