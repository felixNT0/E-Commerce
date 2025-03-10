namespace EComm.Models.Exceptions;

public class UserNameExistsException : Exception
{
    public UserNameExistsException(string message):base(message)
    {
        
    }
}