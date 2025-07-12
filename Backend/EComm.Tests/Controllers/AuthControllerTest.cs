using FakeItEasy;
using Xunit;
using EComm.App.Controllers;
using EComm.App.Contracts;
using EComm.App.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
}
