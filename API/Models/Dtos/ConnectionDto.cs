using static API.Shared.Contact;

namespace API.Models.Dtos
{
	public class ConnectionDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string HomeCountry { get; set; }
        public string? HomeCityOrTown { get; set; }
        public required string CountryOfResidence { get; set; }
        public required string CityOrTownOfResidence { get; set; }
        public ContactMethods PreferredContactMethod { get; set; }
		public required string ContactInfo { get; set; }
    }
}