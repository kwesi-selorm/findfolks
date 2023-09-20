using API.Models;
using API.Models.Contexts;
using API.Models.Dtos;
using Newtonsoft.Json;

namespace API.Services
{
    public class FolkService
    {
        private readonly AppDbContext dbContext;

        public FolkService(AppDbContext appDbContext, ILogger<FolkService> logger)
        {
            dbContext = appDbContext;
        }

        // GET ALL FOLKS, INLCUDING CONNECTIONS AND REQUESTS
        public List<FolkDto> GetFolks()
        {
            return dbContext.Folks
                .Select(
                    f =>
                        new FolkDto
                        {
                            Id = f.Id,
                            Name = f.Name,
                            HomeCountry = f.HomeCountry,
                            HomeCityOrTown = f.HomeCityOrTown,
                            CountryOfResidence = f.CountryOfResidence,
                            CityOrTownOfResidence = f.CityOrTownOfResidence
                        }
                )
                .ToList();
        }

        // GET A SINGLE FOLK
        public FolkDto? GetFolk(int id)
        {
            Folk? folkRecord = dbContext.Folks.FirstOrDefault(f => f.Id == id);
            if (folkRecord != null)
            {
                return new FolkDto
                {
                    Id = folkRecord.Id,
                    Name = folkRecord.Name,
                    HomeCountry = folkRecord.HomeCountry,
                    HomeCityOrTown = folkRecord.HomeCityOrTown,
                    CountryOfResidence = folkRecord.CountryOfResidence,
                    CityOrTownOfResidence = folkRecord.CityOrTownOfResidence
                };
            }
            return null;
        }

        // CREATE A NEW FOLK
        public FolkDto AddFolk(Folk newFolk)
        {
            dbContext.Folks.Add(newFolk);
            dbContext.SaveChanges();

            return new FolkDto
            {
                Id = newFolk.Id,
                Name = newFolk.Name,
                HomeCountry = newFolk.HomeCountry,
                CountryOfResidence = newFolk.CountryOfResidence,
                HomeCityOrTown = newFolk.HomeCityOrTown,
                CityOrTownOfResidence = newFolk.CityOrTownOfResidence,
            };
        }

        // UPDATE A FOLK
        public FolkDto? UpdateFolk(int folkId, string updateString)
        {
            Dictionary<string, object>? updateDict = JsonConvert.DeserializeObject<
                Dictionary<string, object>
            >(updateString);
            if (updateDict == null)
                return null;

            Folk? folkRecord =
                dbContext.Folks.Find(folkId)
                ?? throw new NullReferenceException($"No folks found with the id {folkId}");

            foreach (KeyValuePair<string, object> kvp in updateDict)
            {
                if (kvp.Value != null)
                    dbContext.Entry(folkRecord).Property(kvp.Key).CurrentValue = kvp.Value;
            }

            dbContext.SaveChanges();

            return new FolkDto
            {
                Id = folkRecord.Id,
                Name = folkRecord.Name,
                HomeCountry = folkRecord.HomeCountry,
                CountryOfResidence = folkRecord.CountryOfResidence,
                HomeCityOrTown = folkRecord.HomeCityOrTown,
                CityOrTownOfResidence = folkRecord.CityOrTownOfResidence
            };
        }
    }
}
