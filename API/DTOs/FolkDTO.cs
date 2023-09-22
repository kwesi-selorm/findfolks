namespace API.DTOs
{
    public class FolkDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string HomeCountry { get; set; }
        public string? HomeCityOrTown { get; set; }
        public required string CountryOfResidence { get; set; }
        public required string CityOrTownOfResidence { get; set; }
		public ImageFileDTO? ProfilePhoto { get; set; }
    }
	
	public class ImageFileDTO
{
    public string? FileName { get; set; }
    public byte[]? FileBytes { get; set; }
    public string? ContentType { get; set; }
}
}
