using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/data/")]
    public class DataController : ControllerBase
    {
        private readonly DataService dataService;

        public DataController(DataService dataService)
        {
            this.dataService = dataService;
        }

        [HttpGet("cities")]
        public List<CityDTO> GetCities()
        {
            List<CityDTO> cities = dataService.ParseWorldCitiesCSV();
            return cities;
        }
    }
}
