using API.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class ProfilePhotoService
    {
        private readonly AppDbContext dbContext;
        private readonly ILogger<ProfilePhotoService> logger;

        public ProfilePhotoService(AppDbContext dbContext, ILogger<ProfilePhotoService> logger)
        {
            this.dbContext = dbContext;
            this.logger = logger;
        }

        // GET PROFILE PHOTO WITH USERID AS PARAMETER
        public async Task<string?> GetProfilePhotoPath(int id)
        {
            string? path = await dbContext.ProfilePhotos
                .Where(p => p.UserId == id)
                .Select(p => p.FilePath)
                .FirstOrDefaultAsync();
            // logger.LogInformation("path: {0}", path);
            return path;
        }

        // SAVE PROFILE PHOTO
        public async Task<ProfilePhoto> AddOrUpdateProfilePhoto(
            int id,
            string filePath,
            IFormFile input
        )
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

        public async Task RemoveProfilePhoto(int id)
        {
            ProfilePhoto? profilePhotoRecord = await dbContext.ProfilePhotos.FirstOrDefaultAsync(
                p => p.UserId == id
            );
            if (profilePhotoRecord == null)
                return;
            dbContext.ProfilePhotos.Remove(profilePhotoRecord);
            await dbContext.SaveChangesAsync();
        }
    }
}
