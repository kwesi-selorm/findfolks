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
        private readonly ILogger<FolkService> logger;
        private readonly ImageService imageService;
        private readonly ProfilePhotoService profilePhotoService;

        public FolkService(
            AppDbContext appDbContext,
            ILogger<FolkService> logger,
            ImageService imageService,
            ProfilePhotoService profilePhotoService
        )
        {
            dbContext = appDbContext;
            this.logger = logger;
            this.imageService = imageService;
            this.profilePhotoService = profilePhotoService;
        }

        // GET ALL FOLKS
        public async Task<List<FolkDTO>> GetFolks()
        {
            List<FolkDTO> folks = await dbContext.Folks
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
                        }
                )
                .ToListAsync();

            foreach (FolkDTO folk in folks)
            {
                string? base64String = await GetBase64String(folk.Id);
                folk.ProfilePhoto = base64String;
            }
            return folks;
        }

        // GET A SINGLE FOLK
        public async Task<FolkDTO?> GetFolk(int id)
        {
            Folk? folkRecord = await dbContext.Folks.FirstOrDefaultAsync(f => f.Id == id);
            return folkRecord != null
                ? new FolkDTO()
                {
                    Id = folkRecord.Id,
                    Name = folkRecord.Name,
                    HomeCountry = folkRecord.HomeCountry,
                    HomeCityOrTown = folkRecord.HomeCityOrTown,
                    CountryOfResidence = folkRecord.CountryOfResidence,
                    CityOrTownOfResidence = folkRecord.CityOrTownOfResidence,
                }
                : null;
        }

        // ADD A NEW FOLK
        public async Task<FolkDTO> AddFolk(Folk input)
        {
            Folk createdFolk =
                new()
                {
                    Name = input.Name,
                    HomeCountry = input.HomeCountry,
                    CountryOfResidence = input.CountryOfResidence,
                    HomeCityOrTown = input.HomeCityOrTown,
                    CityOrTownOfResidence = input.CityOrTownOfResidence,
                    PreferredContactMethod = input.PreferredContactMethod,
                    ContactInfo = input.ContactInfo,
                };

            await dbContext.Folks.AddAsync(createdFolk);
            await dbContext.SaveChangesAsync();

            return new FolkDTO()
            {
                Id = createdFolk.Id,
                Name = createdFolk.Name,
                HomeCountry = createdFolk.HomeCountry,
                CountryOfResidence = createdFolk.CountryOfResidence,
                HomeCityOrTown = createdFolk.HomeCityOrTown,
                CityOrTownOfResidence = createdFolk.CityOrTownOfResidence,
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

        // DELETE A FOLK
        public async Task RemoveFolk(int folkId)
        {
            Folk? folkRecord = await dbContext.Folks.FirstOrDefaultAsync(f => f.Id == folkId);
            if (folkRecord == null)
                throw new NullReferenceException($"No folk found with the id {folkId}");

            dbContext.Folks.Remove(folkRecord);
            await dbContext.SaveChangesAsync();
        }

        public async Task<string?> GetBase64String(int userId)
        {
            string? base64String;
            string? profilePhotoPath = await profilePhotoService.GetProfilePhotoPath(userId);
            if (profilePhotoPath == null)
                base64String = null;
            else
                base64String = await imageService.ConvertImageToBase64String(profilePhotoPath);
            return base64String;
        }
    }
}
