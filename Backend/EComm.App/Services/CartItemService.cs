using EComm.App.Contracts;
using EComm.App.Data;
using EComm.App.Models;

namespace EComm.App.Services;

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
