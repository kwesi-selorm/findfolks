using API.Models;
using API.Models.Contexts;
using API.Models.Dtos;

namespace API.Services
{
    public class FolkService
    {
        private readonly AppDbContext dbContext;

        public FolkService(AppDbContext appDbContext)
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
    }
}
