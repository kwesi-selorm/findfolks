using API.DTOs;
using API.Models;
using API.Models.Data;
using Microsoft.EntityFrameworkCore;
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
        public async Task<List<FolkDTO>> GetFolks()
        {
            return await dbContext.Folks
                .Select(
                    f =>
                        new FolkDTO
                        {
                            Id = f.Id,
                            Name = f.Name,
                            HomeCountry = f.HomeCountry,
                            HomeCityOrTown = f.HomeCityOrTown,
                            CountryOfResidence = f.CountryOfResidence,
                            CityOrTownOfResidence = f.CityOrTownOfResidence,
                            ProfilePhoto = f.ProfilePhoto
                        }
                )
                .ToListAsync();
        }

        // GET A SINGLE FOLK
        public async Task<FolkDTO?> GetFolk(int id)
        {
            Folk? folkRecord = await dbContext.Folks.FirstOrDefaultAsync(f => f.Id == id);
            return folkRecord != null
                ? new FolkDTO
                {
                    Id = folkRecord.Id,
                    Name = folkRecord.Name,
                    HomeCountry = folkRecord.HomeCountry,
                    HomeCityOrTown = folkRecord.HomeCityOrTown,
                    CountryOfResidence = folkRecord.CountryOfResidence,
                    CityOrTownOfResidence = folkRecord.CityOrTownOfResidence
                }
                : null;
        }

        // CREATE A NEW FOLK
        public async Task<ResponseFolkDTO> AddFolk(Folk createdFolk)
        {
            Folk folkToSave =
                new()
                {
                    Name = createdFolk.Name,
                    HomeCountry = createdFolk.HomeCountry,
                    CountryOfResidence = createdFolk.CountryOfResidence,
                    HomeCityOrTown = createdFolk.HomeCityOrTown,
                    CityOrTownOfResidence = createdFolk.CityOrTownOfResidence,
                    PreferredContactMethod = createdFolk.PreferredContactMethod,
                    ContactInfo = createdFolk.ContactInfo,
                    ProfilePhoto = createdFolk.ProfilePhoto
                };

            await dbContext.Folks.AddAsync(folkToSave);
            await dbContext.SaveChangesAsync();

            return new ResponseFolkDTO()
            {
                Id = folkToSave.Id,
                Name = folkToSave.Name,
                HomeCountry = folkToSave.HomeCountry,
                CountryOfResidence = folkToSave.CountryOfResidence,
                HomeCityOrTown = folkToSave.HomeCityOrTown,
                CityOrTownOfResidence = folkToSave.CityOrTownOfResidence,
            };
        }

        // UPDATE A FOLK
        public async Task<FolkDTO?> UpdateFolk(int folkId, string updateString)
        {
            Dictionary<string, object>? updateDict = JsonConvert.DeserializeObject<
                Dictionary<string, object>
            >(updateString);
            if (updateDict == null)
                return null;

            Folk? folkRecord =
                await dbContext.Folks.FindAsync(folkId)
                ?? throw new NullReferenceException($"No folks found with the id {folkId}");

            foreach (KeyValuePair<string, object> kvp in updateDict)
            {
                if (kvp.Value != null)
                    dbContext.Entry(folkRecord).Property(kvp.Key).CurrentValue = kvp.Value;
            }

            dbContext.SaveChanges();

            return new FolkDTO
            {
                Id = folkRecord.Id,
                Name = folkRecord.Name,
                HomeCountry = folkRecord.HomeCountry,
                CountryOfResidence = folkRecord.CountryOfResidence,
                HomeCityOrTown = folkRecord.HomeCityOrTown,
                CityOrTownOfResidence = folkRecord.CityOrTownOfResidence
            };
        }

        public ResponseFolkDTO CreateResponseFolkDTO(FolkDTO folkRecord)
        {
            return new ResponseFolkDTO()
            {
                Id = folkRecord.Id,
                Name = folkRecord.Name,
                HomeCountry = folkRecord.HomeCountry,
                HomeCityOrTown = folkRecord.HomeCityOrTown,
                CountryOfResidence = folkRecord.CountryOfResidence,
                CityOrTownOfResidence = folkRecord.CityOrTownOfResidence
            };
        }
    }
}
