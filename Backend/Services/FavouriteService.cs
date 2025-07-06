using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Data;
using EComm.DTOs;
using EComm.Models;
using EComm.Models.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EComm.Services
{
    public class FavouriteService : IFavouriteService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly ILogger<FavouriteService> _logger;

        public FavouriteService(
            ApplicationDbContext dbContext,
            UserManager<AppUser> userManager,
            ILogger<FavouriteService> logger
        )
        {
            _dbContext = dbContext;
            _userManager = userManager;
            _logger = logger;
        }

        public async Task<FavouriteDto> AddToUsersFavourite(
            string userId,
            CreateFavouriteDto favouriteDto
        )
        {
            var product = await _dbContext
                .Products.Include(p => p.Category)
                .SingleOrDefaultAsync(p => p.Id == favouriteDto.ProductId);
            if (product is null)
            {
                throw new ProductNotFoundException(
                    $"The Product with the Id {favouriteDto.ProductId} Does not Exist"
                );
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
            {
                throw new UserNotFoundException($"User with Id : {userId} Does Not Exist");
            }
            if (user.Favourites is null)
            {
                var favourite = new Favourite { UserId = user.Id };
                user.Favourites = favourite;
            }

            user.Favourites.Products.Add(product);
            await _dbContext.SaveChangesAsync();

            return new FavouriteDto
            {
                UserId = user.Id,

                Product = new()
                {
                    Id = product.Id,
                    ProductName = product.Name,
                    Price = product.Price,
                    Category = product.Category.Name,
                    ImageUrl = product.ImageUrl,
                },
            };
        }

        public async Task<IEnumerable<ProductDto>> GetUsersFavourites(string userId)
        {
            var usersFavourites = await _dbContext
                .Favourites.Where(f => f.UserId == userId)
                .Include(f => f.Products)
                .ThenInclude(p => p.Category)
                .AsNoTracking()
                .FirstOrDefaultAsync();
            if (usersFavourites is null || usersFavourites.Products is null)
            {
                return [];
            }
            var favouriteProducts = usersFavourites.Products.ToList();
            var favouriteProductsDto = favouriteProducts.Select(p => new ProductDto
            {
                Id = p.Id,
                ProductName = p.Name,
                ImageUrl = p.ImageUrl ?? "testUrl",
                Price = p.Price,
                Description = p.Description,
                Category = p.Category?.Name ?? "",
            });
            return favouriteProductsDto;
        }

        public async Task RemoveFavourite(string userId, Guid productId)
        {
            var favourites = await _dbContext
                .Favourites.Where(f => f.UserId == userId)
                .Include(f => f.Products)
                .SingleOrDefaultAsync();
            if (favourites is null)
            {
                _logger.LogError($"The User with id {userId} does not have any favourite product ");
                throw new FavouriteNotFoundException($"You do not have any favourite product ");
            }

            var product = favourites.Products.Where(p => p.Id == productId).SingleOrDefault();
            if (product is null)
            {
                _logger.LogError(
                    $"The product with id :{productId} is not in the users favourites List"
                );
                throw new ProductNotFoundException($"The product is not in your favourites List");
            }
            favourites.Products.Remove(product);
            await _dbContext.SaveChangesAsync();
        }
    }
}
