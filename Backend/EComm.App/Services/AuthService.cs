using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models.Exceptions;
using EComm.App.Contracts;
using EComm.App.Data;
using EComm.App.DTOs;
using EComm.App.Models;
using EComm.App.Models.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace EComm.App.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtTokenService _tokenService;
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _dbContext;

        public AuthService(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            IJwtTokenService jwtTokenService,
            ILogger<AuthService> logger,
            ApplicationDbContext dbContext
        )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _tokenService = jwtTokenService;
            _logger = logger;
            _dbContext = dbContext;
        }

        public async Task<UserDto?> RegisterUser(UserCreationDto userDto)
        {
            var user = new AppUser
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                UserName = userDto.UserName,
                Email = userDto.Email,
            };
            var createdUser = await _userManager.CreateAsync(user, userDto.Password);
            if (createdUser.Succeeded)
            {
                user.Cart = new Cart { UserId = user.Id };
                await _userManager.AddToRoleAsync(user, userDto.Role);
                await _dbContext.SaveChangesAsync();
                return new UserDto
                {
                    Id = user.Id,
                    Name = user.FirstName + " " + user.LastName,
                    Role = userDto.Role,
                };
            }

            var errors = string.Join("; ", createdUser.Errors.Select(e => e.Description));
            _logger.LogError($"User Registration failed: {errors}");
            throw new UserRegistrationException($"User Registration failed: {errors}");
        }

        public async Task<LoginDto> LoginUser(UserLoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user is null)
            {
                _logger.LogError("User not Found");
                throw new UserNotFoundException(
                    $"User with Email : {loginDto.Email} Does Not Exist"
                );
            }
            var result = await _signInManager.CheckPasswordSignInAsync(
                user,
                loginDto.Password,
                false
            );
            if (!result.Succeeded)
            {
                _logger.LogError($"wrong Password");
                throw new InvalidUserCredentialsException("Email or Password is incorrect");
            }
            return new LoginDto { Token = await _tokenService.GenerateToken(user) };
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var users = await _userManager.Users.AsNoTracking().ToListAsync();
            if (users is null)
            {
                return [];
            }
            List<UserDto> usersDto = [];

            foreach (var u in users)
            {
                // methods to get the Users Roles if i can get it using the usersId ?
                var roles = await _userManager.GetRolesAsync(u);
                var userRole = roles.FirstOrDefault();
                var dto = new UserDto
                {
                    Id = u.Id,
                    Name = u.FirstName + " " + u.LastName,
                    Role = userRole,
                };
                usersDto.Add(dto);
            }

            return usersDto;
        }

        public async Task DeleteUser(string userId)
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id.Equals(userId));
            if (user is null)
            {
                _logger.LogError("User not Found");
                throw new UserNotFoundException($"User with Id : {userId} Does Not Exist");
            }
            _dbContext.Remove(user);
            await _dbContext.SaveChangesAsync();
        }
    }
}
