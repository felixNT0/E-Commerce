namespace EComm.App.Models.Exceptions;

public class UserRegistrationException : Exception
{
    public UserRegistrationException(string message)
        : base(message) { }
}
