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

        // GET FOLKS TO DISCOVER
        public async Task<List<FolkDTO>> GetFolksForUser(int id)
        {
            Folk? folkRecord =
                await dbContext.Folks.Where(f => f.Id == id).FirstOrDefaultAsync()
                ?? throw new Exception("Folk not found");
            List<Folk> connections = folkRecord.Connections;
            List<Folk> allFolks = await dbContext.Folks.ToListAsync();

            List<FolkDTO> folksToDiscover = allFolks
                .Where(
                    f =>
                        !connections.Contains(f)
                        && f.HomeCountry == folkRecord.HomeCountry
                        && f.Id != folkRecord.Id
                )
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
                            Bio = f.Bio,
                        }
                )
                .ToList();
            foreach (FolkDTO folk in folksToDiscover)
            {
                string? base64String = await GetBase64String(folk.Id);
                folk.ProfilePhoto = base64String;
            }
            return folksToDiscover;
        }

        // GET ALL FOLKS
        public async Task<List<FolkDTO>> GetAllFolks()
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
                            Bio = f.Bio,
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
        public async Task<FolkDTO?> GetSingleFolk(int id)
        {
            Folk? folkRecord = await dbContext.Folks.Where(f => f.Id == id).FirstOrDefaultAsync();

            return folkRecord == null
                ? null
                : new FolkDTO()
                {
                    Id = folkRecord.Id,
                    Name = folkRecord.Name,
                    HomeCountry = folkRecord.HomeCountry,
                    HomeCityOrTown = folkRecord.HomeCityOrTown,
                    CountryOfResidence = folkRecord.CountryOfResidence,
                    CityOrTownOfResidence = folkRecord.CityOrTownOfResidence,
                    Bio = folkRecord.Bio
                };
        }

        // GET FOLK PROFILE FOR A USER
        public async Task<FolkProfileDTO?> GetFolkProfile(int id)
        {
            Folk? folkRecord = await dbContext.Folks
                .Where(f => f.Id == id)
                .Include(f => f.Connections)
                .FirstOrDefaultAsync();
            if (folkRecord == null)
                return null;

            List<ConnectionDTO> connections = new();
            foreach (Folk c in folkRecord.Connections)
            {
                ConnectionDTO connection =
                    new()
                    {
                        Id = c.Id,
                        Name = c.Name,
                        HomeCountry = c.HomeCountry,
                        HomeCityOrTown = c.HomeCityOrTown,
                        CountryOfResidence = c.CountryOfResidence,
                        CityOrTownOfResidence = c.CityOrTownOfResidence,
                        PreferredContactMethod = c.PreferredContactMethod,
                        ContactInfo = c.ContactInfo,
                        Bio = c.Bio
                    };
                string? path = await profilePhotoService.GetProfilePhotoPath(c.Id);
                if (string.IsNullOrEmpty(path))
                {
                    connection.ProfilePhoto = null;
                    connections.Add(connection);
                    continue;
                }
                connection.ProfilePhoto = await imageService.ConvertImageToBase64String(path);
                connections.Add(connection);
            }

            string? base64String;
            string? filePath = await profilePhotoService.GetProfilePhotoPath(folkRecord.Id);
            base64String = !string.IsNullOrEmpty(filePath)
                ? await imageService.ConvertImageToBase64String(filePath)
                : null;

            return new FolkProfileDTO()
            {
                Id = folkRecord.Id,
                Name = folkRecord.Name,
                HomeCountry = folkRecord.HomeCountry,
                HomeCityOrTown = folkRecord.HomeCityOrTown,
                CountryOfResidence = folkRecord.CountryOfResidence,
                CityOrTownOfResidence = folkRecord.CityOrTownOfResidence,
                PreferredContactMethod = folkRecord.PreferredContactMethod,
                ContactInfo = folkRecord.ContactInfo,
                ProfilePhoto = base64String,
                Connections = connections,
                Bio = folkRecord.Bio
            };
        }

        // ADD A NEW FOLK
        public async Task<FolkDTO> AddFolk(CreateFolkDTO input)
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
                    Bio = input.Bio
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
                Bio = createdFolk.Bio
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

        // ADD CONNECTION
        public async Task AddConnections(int folk1Id, int folk2Id)
        {
            Folk folk1Record =
                await dbContext.Folks.FindAsync(folk1Id)
                ?? throw new Exception("No folk found with the id " + folk1Id);
            Folk folk2Record =
                await dbContext.Folks.FindAsync(folk2Id)
                ?? throw new Exception("No folk found with the id " + folk2Id);
            folk1Record.Connections.Add(folk2Record);
            await dbContext.SaveChangesAsync();
            folk2Record.Connections.Add(folk1Record);
            await dbContext.SaveChangesAsync();
        }

        // DELETE CONNECTIONS
        public async Task RemoveConnections(int folk1Id, int folk2Id)
        {
            Folk folk1Record =
                await dbContext.Folks.FindAsync(folk1Id)
                ?? throw new Exception("No folk found with the id " + folk1Id);
            Folk folk2Record =
                await dbContext.Folks.FindAsync(folk2Id)
                ?? throw new Exception("No folk found with the id " + folk2Id);
            folk1Record.Connections.Remove(folk2Record);
            await dbContext.SaveChangesAsync();
            folk1Record.Connections.Remove(folk2Record);
            await dbContext.SaveChangesAsync();
        }

        public async Task<string?> GetBase64String(int userId)
        {
            string? profilePhotoPath = await profilePhotoService.GetProfilePhotoPath(userId);
            string? base64String =
                profilePhotoPath == null
                    ? null
                    : await imageService.ConvertImageToBase64String(profilePhotoPath);
            return base64String;
        }
    }
}
