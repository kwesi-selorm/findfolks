using API.Models;
using API.Models.Data;

namespace API.DTOs
{
    public class FolkDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string HomeCountry { get; set; }
        public string? HomeCityOrTown { get; set; }
        public required string CountryOfResidence { get; set; }
        public required string CityOrTownOfResidence { get; set; }
        public ProfilePhoto? ProfilePhoto { get; set; }
    }
}
