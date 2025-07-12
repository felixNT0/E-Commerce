using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Data;
using EComm.App.DTOs;

namespace EComm.App.Contracts
{
    public interface IOrderService
    {
        Task<PlaceOrderDto> PlaceOrder(string userId, CreateOrderDto orderDto);
        Task<PagedResultsDto<OrderDto>> GetOrders(string userId, int page, int pageSize);
    }
}
