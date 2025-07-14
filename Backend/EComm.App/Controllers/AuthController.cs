using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Contracts;
using EComm.App.DTOs;
using EComm.App.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace EComm.App.Controllers
{
    [ApiController]
    [Route("api/auth/users")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserCreationDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var result = await _authService.RegisterUser(userDto);
                return Ok(result);
            }
            catch (UserRegistrationException e)
            {
                return StatusCode(409, e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                var result = await _authService.LoginUser(loginDto);
                return Ok(result);
            }
            catch (InvalidUserCredentialsException e)
            {
                _logger.LogWarning(e.Message);
                return Unauthorized(e.Message);
            }
            catch (UserNotFoundException e)
            {
                _logger.LogInformation(e.Message);
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return Problem(e.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var usersDto = await _authService.GetUsers();
            return Ok(usersDto);
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUserAccount(string userId)
        {
            try
            {
                await _authService.DeleteUser(userId);
                return NoContent();
            }
            catch (UserNotFoundException e)
            {
                _logger.LogError(e.Message);
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError($"An Error occurred while tying to Delete the User {e.Message}");
                return StatusCode(
                    500,
                    $"An Error occurred while tying to Delete the User {e.Message}"
                );
            }
        }
    }
}
