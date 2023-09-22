namespace API.Services
{
    public class ImageService
    {
        public async Task<string?> ConvertImageToBase64String(string filePath)
        {
            byte[] bytes = await File.ReadAllBytesAsync(filePath);
            if (bytes.Length == 0)
                return null;
            string base64String = Convert.ToBase64String(bytes);
            return base64String;
        }
    }
}
