using System.IO.Compression;
using System;

namespace API.Services
{
    public class ImageService
    {
        public void DeleteImageFromFileSystem(string? filePath)
        {
            if (!string.IsNullOrEmpty(filePath) && System.IO.File.Exists(filePath))
                System.IO.File.Delete(filePath);
        }

        public async Task<string?> ConvertImageToBase64String(string filePath)
        {
            if (System.IO.File.Exists(filePath) == false)
                return null;

            byte[] bytes = await File.ReadAllBytesAsync(filePath);
            if (bytes.Length == 0)
                return null;
            string base64String = Convert.ToBase64String(bytes);
            // string compressedBase64String = await CompressBase64String(base64String);
            return base64String;
        }

        public async Task<string> CompressBase64String(string base64String)
        {
            string compressedBase64String;
            byte[] bytes = Convert.FromBase64String(base64String);

            using (MemoryStream ms = new())
            {
                using (GZipStream zip = new(ms, CompressionMode.Compress))
                {
                    await zip.WriteAsync(bytes);
                }
                byte[] compressedBytes = ms.ToArray();
                compressedBase64String = Convert.ToBase64String(compressedBytes);
            }
            return compressedBase64String;
        }
    }
}
