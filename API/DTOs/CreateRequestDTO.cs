namespace API.DTOs
{
	public class CreateRequestDTO
    {
        public required int SenderId { get; set; }
		
		public required int RecipientId { get; set; }
    }
}