using EComm.App.DTOs;

namespace EComm.App.Contracts;

public interface IAuthService
{
    Task<UserDto?> RegisterUser(UserCreationDto userDto);
    Task<LoginDto?> LoginUser(UserLoginDto loginDto);
    Task<IEnumerable<UserDto>> GetUsers();
    Task DeleteUser(string userId);
}
