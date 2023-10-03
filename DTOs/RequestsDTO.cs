namespace API.DTOs
{
    public class RequestsDTO
    {
        public List<SentRequestInfo>? sentRequests;
        public List<ReceivedRequestInfo>? receivedRequests;
    }

    public class SentRequestInfo
    {
        public int recipientId;
        public DateTime dateSent;
    }

    public class ReceivedRequestInfo
    {
        public int senderId;
        public DateTime dateReceived;
    }
}
