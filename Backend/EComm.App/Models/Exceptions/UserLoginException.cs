namespace EComm.App.Models.Exceptions;

public class UserLoginException : Exception
{
    public UserLoginException(string message)
        : base(message) { }
}
