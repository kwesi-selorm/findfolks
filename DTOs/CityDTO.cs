namespace API.DTOs
{
    public class CityDTO
    {
        public int Id { get; set; }
        public required string Label { get; set; }
        public required string Value { get; set; }
    }
}
