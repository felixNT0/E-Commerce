using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Models;

namespace EComm.App.Contracts
{
    public interface ICartItemService
    {
        CartItem CreateCartItem(Guid productId);
    }
}
