using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ResponseFolkDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string HomeCountry { get; set; }
        public string? HomeCityOrTown { get; set; }
        public required string CountryOfResidence { get; set; }
        public required string CityOrTownOfResidence { get; set; }
        public string? ProfilePhoto { get; set; }
    }
}
