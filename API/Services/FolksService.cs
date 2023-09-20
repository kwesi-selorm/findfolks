using API.Models;
using API.Models.Contexts;
using API.Models.Dtos;

namespace API.Services
{
    public class FolksService
    {
        private readonly AppDbContext dbContext;

        public FolksService(AppDbContext appDbContext)
        {
            dbContext = appDbContext;
        }

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
                CityOrTownOfResidence = newFolk.CityOrTownOfResidence,
            };
        }
    }
}
