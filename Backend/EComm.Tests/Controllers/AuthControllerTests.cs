using EComm.App.Contracts;
using EComm.App.Controllers;
using EComm.App.DTOs;
using EComm.App.Models.Exceptions;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Xunit;

namespace EComm.Tests.Controllers;

public class AuthControllerTests
{
    private readonly AuthController _controller;
    private readonly IAuthService _service;
    private readonly ILogger<AuthController> _logger;

    public AuthControllerTests()
    {
        _service = A.Fake<IAuthService>();
        _logger = A.Fake<ILogger<AuthController>>();
        _controller = new AuthController(_service, _logger);
    }

    [Fact]
    public async Task Register_WithValid_Data_Should_Return_ok()
    {
        // Arrange
        var registerUserDto = new UserCreationDto
        {
            UserName = "johndoe",
            FirstName = "John",
            LastName = "Doe",
            Password = "StrongPass123!",
            Email = "john@example.com",
            Role = "Customer",
        };

        var userDto = new UserDto
        {
            Id = "1",
            Name = $"{registerUserDto.FirstName} {registerUserDto.LastName}",
            Role = "Customer",
        };

        A.CallTo(() => _service.RegisterUser(registerUserDto)).Returns(userDto);

        // Act
        var result = await _controller.Register(registerUserDto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var resultDto = Assert.IsType<UserDto>(okResult.Value);
        Assert.Equal(userDto, resultDto);
    }

    [Fact]
    public async Task Register_InWithValidRole_Should_Return_Error()
    {
        // Arrange
        var registerUserDto = new UserCreationDto
        {
            UserName = "johndoe",
            FirstName = "John",
            LastName = "Doe",
            Password = "StrongPass123!",
            Email = "john@example.com",
            Role = "User",
        };
        _controller.ModelState.AddModelError("Role", "The value 'User' is not valid for Role.");

        // Act
        var result = await _controller.Register(registerUserDto);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        var modelState = Assert.IsAssignableFrom<SerializableError>(badRequestResult.Value);
        Assert.True(modelState.ContainsKey("Role"));
    }

    [Fact]
    public async Task Login_WithValidCredentials_Should_ReturnOk()
    {
        // Arrange
        var loginDto = new UserLoginDto { Email = "john@example.com", Password = "CorrectPass!" };
        var loginResult = new LoginDto { Token = "jwt.token.value" };

        A.CallTo(() => _service.LoginUser(loginDto)).Returns(loginResult);

        // Act
        var result = await _controller.Login(loginDto);

        // Assert
        var ok = Assert.IsType<OkObjectResult>(result);
        var token = Assert.IsType<LoginDto>(ok.Value);
        Assert.Equal(loginResult.Token, token.Token);
    }

    [Fact]
    public async Task Login_WrongPassword_Should_ReturnUnauthorized()
    {
        var loginDto = new UserLoginDto { Email = "john@example.com", Password = "WrongPass" };

        A.CallTo(() => _service.LoginUser(loginDto))
            .ThrowsAsync(new InvalidUserCredentialsException("Invalid credentials"));

        var result = await _controller.Login(loginDto);

        var unauthorized = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal("Invalid credentials", unauthorized.Value);
    }

    [Fact]
    public async Task GetUsers_Should_ReturnListOfUsers()
    {
        // Arrange
        var users = new List<UserDto>
        {
            new UserDto
            {
                Id = "1",
                Name = "John Doe",
                Role = "Customer",
            },
            new UserDto
            {
                Id = "2",
                Name = "Jane Smith",
                Role = "Admin",
            },
        };

        A.CallTo(() => _service.GetUsers()).Returns(users);

        // Act
        var result = await _controller.GetUsers();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var returnedUsers = Assert.IsAssignableFrom<List<UserDto>>(okResult.Value);
        Assert.Equal(2, returnedUsers.Count);
        Assert.Equal("John Doe", returnedUsers[0].Name);
        Assert.Equal("Jane Smith", returnedUsers[1].Name);
    }

    [Fact]
    public async Task DeleteUserAccount_WithValidUser_Should_ReturnNoContent()
    {
        // Arrange
        var userId = "1";
        A.CallTo(() => _service.DeleteUser(userId)).Returns(Task.CompletedTask);

        // Act
        var result = await _controller.DeleteUserAccount(userId);

        // Assert
        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeleteUserAccount_UserNotFound_Should_ReturnNotFound()
    {
        // Arrange
        var userId = "non-existent-id";
        var message = $"User with Id : {userId} Does Not Exist";

        A.CallTo(() => _service.DeleteUser(userId)).ThrowsAsync(new UserNotFoundException(message));

        // Act
        var result = await _controller.DeleteUserAccount(userId);

        // Assert
        var notFound = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal(message, notFound.Value);
    }
}
