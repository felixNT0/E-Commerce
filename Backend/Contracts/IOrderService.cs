using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Data;
using EComm.DTOs;

namespace EComm.Contracts
{
    public interface IOrderService
    {
        Task<PlaceOrderDto> PlaceOrder(string userId, CreateOrderDto orderDto);
        Task<PagedResultsDto<OrderDto>> GetOrders(string userId, int page, int pageSize);
    }
}
