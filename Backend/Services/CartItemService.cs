using EComm.Contracts;
using EComm.Data;
using EComm.Models;

namespace EComm.Services;

public class CartItemService : ICartItemService
{
    private readonly ApplicationDbContext _dbContext;

    public CartItemService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public CartItem CreateCartItem(Guid productId)
    {
        var cartItem = new CartItem { ProductId = productId };
        return cartItem;
    }
}
