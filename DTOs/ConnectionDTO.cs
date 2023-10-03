using static API.Utils.Constants;

namespace API.DTOs
{
    public class ConnectionDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string HomeCountry { get; set; }
        public string? HomeCityOrTown { get; set; }
        public required string CountryOfResidence { get; set; }
        public required string CityOrTownOfResidence { get; set; }
        public ContactMethods PreferredContactMethod { get; set; }
        public required string ContactInfo { get; set; }
        public string? ProfilePhoto { get; set; }
        public string Bio { get; set; } = string.Empty;
    }
}
