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

        public FavouriteService(ApplicationDbContext dbContext, UserManager<AppUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;

        }

        public async Task<FavouriteDto> AddToUsersFavourite(CreateFavouriteDto favouriteDto)
        {
            var product = await _dbContext.Products
                                        .Include(p => p.Category)
                                        .SingleOrDefaultAsync(p => p.Id == favouriteDto.ProductId);
            if (product is null)
            {
                throw new ProductNotFoundException($"The Product with the Id {favouriteDto.ProductId} Does not Exist");
            }
            var user = await _userManager.FindByIdAsync(favouriteDto.UserId);
            if (user is null)
            {
                throw new UserNotFoundException($"User with Id : {favouriteDto.UserId} Does Not Exist");
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
                    ImageUrl = product.ImageUrl
                }
            };
        }

        public async Task<IEnumerable<ProductDto>> GetUsersFavourites(string userId)
        {
            
            var usersFavourites = await _dbContext.Favourites
                                        .Where(f => f.UserId == userId)
                                        .Include(f=> f.Products)
                                        .ThenInclude(p=> p.Category)
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
                Category = p.Category?.Name ?? ""
            });
            return favouriteProductsDto;
        }
    }
}