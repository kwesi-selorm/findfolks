using System.ComponentModel.DataAnnotations;
using API.Models.Data;
using static API.Utils.Constants;

namespace API.Models
{
    public class Folk
    {
        [Key]
        public int Id { get; set; }

        [MinLength(3, ErrorMessage = "Your name must be at least 3 characters long")]
        public required string Name { get; set; }

        [Display(Name = "Home country")]
        public required string HomeCountry { get; set; }

        public string? HomeCityOrTown { get; set; }

        public required string CountryOfResidence { get; set; }

        public required string CityOrTownOfResidence { get; set; }

        [EnumDataType(typeof(ContactMethods))]
        public required ContactMethods PreferredContactMethod { get; set; }

        [Display(Name = "Contact information")]
        public required string ContactInfo { get; set; }

        public List<string> Connections { get; set; } = new List<string>();
    }
}
