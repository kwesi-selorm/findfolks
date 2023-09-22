using API.Models;
using static API.Utils.Constants;

namespace API.DTOs
{
    public class CreateFolkDTO 
    {
        public required string Name { get; set; }
		
        public required string HomeCountry { get; set; }
		
        public string? HomeCityOrTown { get; set; }
		
        public required string CountryOfResidence { get; set; }
		
        public required string CityOrTownOfResidence { get; set; }
		
        public required ContactMethods PreferredContactMethod { get; set; }
		
        public required string ContactInfo { get; set; }
		
        public IFormFile? ProfilePhoto;
    }
}
