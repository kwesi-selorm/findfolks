namespace API.Models
{
    public class Connection
    {
        public required Folk Folk1 { get; set; }
        public required Folk Folk2 { get; set; }
        public DateTime DateConnected { get; set; }
    }
}
