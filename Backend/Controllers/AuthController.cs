using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.Exceptions;
using EComm.Contracts;
using EComm.DTOs;
using EComm.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace EComm.Controllers
{
    [ApiController]
    [Route("api/auth")]
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
            if (!ModelState.IsValid) BadRequest();
            try
            {
                var result = await _authService.RegisterUser(userDto);
                return Ok(result);
            }
            catch (UserNameExistsException e)
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
            if (!ModelState.IsValid) BadRequest();
            try
            {
                var result = await _authService.LoginUser(loginDto);
                if (result is null) return Unauthorized("Username or Password is incorrect");
                return Ok(result);
            }
            catch (UserLoginException e)
            {
                return StatusCode(500, e.Message);
            }
            catch(InvalidUserCredentialsException e)
            {
                return Unauthorized(e.Message);
            }
            catch(Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500, e.Message);
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var usersDto = await _authService.GetUsers();
            return Ok(usersDto);
        }

    }
}