using System.Text;
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

        public FolkService(
            AppDbContext appDbContext,
            ILogger<FolkService> logger,
            ImageService imageService
        )
        {
            dbContext = appDbContext;
            this.logger = logger;
            this.imageService = imageService;
        }

        // GET ALL FOLKS, INLCUDING CONNECTIONS AND REQUESTS
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

        // CREATE A NEW FOLK
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

        public async Task<string?> GetProfilePhotoPath(int id)
        {
            string? path = await dbContext.ProfilePhotos
                .Where(p => p.UserId == id)
                .Select(p => p.FilePath)
                .FirstOrDefaultAsync();
            logger.LogInformation("path: {0}", path);
            return path;
        }

        public async Task<ProfilePhoto> SaveProfilePhoto(int id, string filePath, IFormFile input)
        {
            ProfilePhoto photoToSave = new();
            ProfilePhoto? photoRecord = await dbContext.ProfilePhotos.FirstOrDefaultAsync(
                p => p.UserId == id
            );
            if (photoRecord != null)

                dbContext.ProfilePhotos.Remove(photoRecord);

            photoToSave = new()
            {
                UserId = id,
                Name = input.FileName,
                FilePath = filePath
            };
            await dbContext.ProfilePhotos.AddAsync(photoToSave);

            await dbContext.SaveChangesAsync();
            return photoToSave;
        }

        public async Task<string?> GetBase64String(int userId)
        {
            string? base64String;
            string? profilePhotoPath = await GetProfilePhotoPath(userId);
            if (profilePhotoPath == null)
                base64String = null;
            else
                base64String = await imageService.ConvertImageToBase64String(profilePhotoPath);
            return base64String;
        }
    }
}
