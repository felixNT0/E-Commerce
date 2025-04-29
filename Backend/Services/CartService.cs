using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Data;
using EComm.DTOs;
using EComm.Models;
using EComm.Models.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace EComm.Services
{
    public class CartService : ICartService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly ICartItemService _cartService;
        private readonly ILogger<CartService> _logger;

        public CartService(ApplicationDbContext dbContext, ICartItemService cartService, ILogger<CartService> logger)
        {
            _dbContext = dbContext;
            _cartService = cartService;
            _logger = logger;

        }

        public async Task AddCartItemAsync(Guid productId, string userId)
        {
            //create a cartItem Entity then add it the cart
            var product = await _dbContext.Products.FindAsync(productId);
            if (product == null)
            {
                _logger.LogError($"Product with Id : {productId} does not Exist");
                throw new ProductNotFoundException("Product not Found");
            }

            var cartItem = new CartItem { Product = product};
            // get the users cart
            var cart = await _dbContext.Carts.Where(c => c.UserId == userId).SingleOrDefaultAsync();

            if (cart is null)
            {
                _logger.LogError($"Cart with userId : {userId} does not exist");
                throw new CartNotFoundException($"Cart not Found ");
            }

            cart.CartItems.Add(cartItem);
            await _dbContext.SaveChangesAsync();

        }

        public async Task<CartDto> GetCartAsync(string userId)
        {
            var cartItemsDto = await _dbContext.CartItems
            .Where(c => c.Cart.UserId == userId)
            .Include(c => c.Product)
            .ThenInclude(p => p.Category)
            .AsNoTracking()
            .Select(c => new CartItemDto
            {
                Id = c.Id,
                ProductName = c.Product.Name,
                ProductCategory = c.Product.Category.Name,
                ProductPrice = c.Product.Price,
                ProductQuantity = c.Quantity,
                ImageUrl = c.Product.ImageUrl
            })
            .ToListAsync();

            if (cartItemsDto is null)
            {
                return new CartDto { CartItems = [] };
            }

            return new CartDto { CartItems = cartItemsDto };
        }

        public async Task<(IEnumerable<CartItemDto> cartItems, string cartIds)> AddToCartCollectionAsync(string userId, AddToCartCollectionDto addToCartCollectionDto)
        {

            var cart = await _dbContext.Carts
                    .Include(c => c.CartItems)
                    .ThenInclude(c => c.Product)
                    .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null)
            {
                _logger.LogError("Cart not found for user.");
                throw new CartNotFoundException("Cart not found for user.");
            }

            var productIds = addToCartCollectionDto.CartItemDtos.Select(c => c.ProductId).ToList();
            var products = await _dbContext.Products
                .Where(p => productIds.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id);

            var addedItems = new List<CartItemDto>();

            foreach (var item in addToCartCollectionDto.CartItemDtos)
            {
                if (!products.ContainsKey(item.ProductId))
                {
                    _logger.LogError($"Product {item.ProductId} not found.");
                    throw new ProductNotFoundException($"Product with Id : {item.ProductId} Does not Exist");
                }

                var existingCartItem = cart.CartItems.FirstOrDefault(c => c.ProductId == item.ProductId);
                if (existingCartItem != null)
                {
                    existingCartItem.Quantity = item.Quantity;
                    addedItems.Add(new CartItemDto
                    {
                        Id = existingCartItem.Id,
                        ProductName = existingCartItem.Product.Name,
                        ProductPrice = existingCartItem.Product.Price,
                        ProductQuantity = existingCartItem.Quantity,
                        ImageUrl = existingCartItem.Product.ImageUrl ?? ""
                    });
                }
                else
                {
                    var product = products[item.ProductId];
                    var newCartItem = new CartItem
                    {
                        Id = Guid.NewGuid(),
                        CartId = cart.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        Product = product
                    };
                    cart.CartItems.Add(newCartItem);
                    addedItems.Add(new CartItemDto
                    {
                        Id = newCartItem.Id,
                        ProductName = newCartItem.Product.Name,
                        ProductPrice = newCartItem.Product.Price,
                        ProductQuantity = newCartItem.Quantity,
                        ImageUrl = newCartItem.Product.ImageUrl ?? ""
                    });
                    await _dbContext.CartItems.AddAsync(newCartItem);
                }

            }

            await _dbContext.SaveChangesAsync();
            var ids = string.Join(", ", products.Keys);
            return (cartItems: addedItems, cartIds: ids);
        }

        public async Task RemoveCartItem(string userId, Guid cartItemId)
        {
            var cart = await _dbContext.Carts.Where(c => c.UserId == userId).Include(c => c.CartItems).SingleOrDefaultAsync();
            if (cart == null)
            {
                _logger.LogError("Cart not found for user.");
                throw new CartNotFoundException("Cart not found for user.");
            }
            var cartItem = cart.CartItems.Where(ci => ci.Id == cartItemId).SingleOrDefault();
            if (cartItem is null)
            {
                _logger.LogError("CartItem not found.");
                throw new CartItemNotFoundException("CartItem does not exist");
            }

            _dbContext.CartItems.Remove(cartItem);
            await _dbContext.SaveChangesAsync();
        }

        public async Task ClearCartAsync(string userId)
        {
            var cart = await _dbContext.Carts.Where(c => c.UserId == userId).Include(c => c.CartItems).SingleOrDefaultAsync();
            if (cart == null)
            {
                _logger.LogError("Cart not found for user.");
                throw new CartNotFoundException("Cart not found for user.");
            }


            if (!cart.CartItems.Any())
            {
                _logger.LogInformation("Cart is already empty.");
                return;
            }

            _dbContext.CartItems.RemoveRange(cart.CartItems);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateCartItemAsync(Guid cartItemId, UpdateCartItemDto cartItemDto)
        {
            var cartItem = await _dbContext.CartItems
            .Include(ci => ci.Product)
            .FirstOrDefaultAsync(ci => ci.Id == cartItemId);

            if (cartItem == null)
            {
                _logger.LogError($"CartItem with ID {cartItemId} not found.");
                throw new CartItemNotFoundException("CartItem Does not Exist");
            }

            cartItem.Quantity = cartItemDto.Quantity;

            await _dbContext.SaveChangesAsync();
        }

    }
}