using System.ComponentModel.DataAnnotations;
using EComm.App.Shared.Enums;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace EComm.App.DTOs;

public record UserDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string? Role { get; set; }
}

public record UserCreationDto
{
    [Required]
    public string UserName { get; set; }

    [Required]
    public string FirstName { get; set; }

    [Required]
    public string LastName { get; set; }

    [Required]
    public string Password { get; set; }

    [EmailAddress]
    public string Email { get; set; }

    [EnumDataType(typeof(UserRole))]
    public string Role { get; set; }
}

public record UserLoginDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public record LoginDto
{
    public string Token { get; set; }
}
