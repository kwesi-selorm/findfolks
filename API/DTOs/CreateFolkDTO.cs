using System.ComponentModel.DataAnnotations;
using API.Models;

namespace API.DTOs
{
	public class CreateFolkDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
		
		public required string Name { get; set; }

        [Display(Name = "Home country")]
        public required string HomeCountry { get; set; }

        public string? HomeCityOrTown { get; set; }

        public required string CountryOfResidence { get; set; }

        public required string CityOrTownOfResidence { get; set; }
		
		public required int PreferredContactMethod { get; set; }
		
		[Display(Name = "Contact information")]
        public required string ContactInfo { get; set; }
		
		[MaxLength(150)]
        public string Bio { get; set; } = string.Empty;

    }
}