using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public enum ContactMethods
    {
        Mobile,
        Email,
        Facebook,
        Twitter,
        Snapchat
    }

    public class Folk
    {
        [Key]
        public int FolkKey { get; set; }
        public required string Name { get; set; }
        public required string HomeCountry { get; set; }
        public string? HomeCityOrTown { get; set; }
        public required string CountryOfResidence { get; set; }
        public required string CityOrTownOfResidence { get; set; }
        public ContactMethods PreferredContactMethod { get; set; }
        public required string ContactInfo { get; set; }
        public List<string> Connections { get; set; } = new List<string>();
    }
}
