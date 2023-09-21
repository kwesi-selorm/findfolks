using System.ComponentModel.DataAnnotations;
using static API.Utils.Constants;

namespace API.DTOs
{
    public class UpdateFolkDTO
    {
        [MinLength(3, ErrorMessage = "Your name must be at least 3 characters long")]
        public string? Name { get; set; }

        [Display(Name = "Home country")]
        public string? HomeCountry { get; set; }

        public string? HomeCityOrTown { get; set; }

        public string? CountryOfResidence { get; set; }

        public string? CityOrTownOfResidence { get; set; }

        public ContactMethods? PreferredContactMethod { get; set; }

        [Display(Name = "Contact information")]
        public string? ContactInfo { get; set; }
    }
}
