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
            return base64String;
        }
    }
}
