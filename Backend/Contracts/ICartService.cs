using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.DTOs;

namespace EComm.Contracts
{
    public interface ICartService
    {
        Task AddCartItemAsync(Guid productId, string userId);
        Task<CartDto> GetCartAsync(string userId);

        Task<(IEnumerable<CartItemDto> cartItems, string cartIds)> AddToCartCollectionAsync(
            string userId,
            AddToCartCollectionDto addToCartCollectionDto
        );

        Task RemoveCartItem(string userId, Guid cartItemId);

        Task ClearCartAsync(string userId);

        Task UpdateCartItemAsync(Guid cartItemId, UpdateCartItemDto cartItemDto);
    }
}
