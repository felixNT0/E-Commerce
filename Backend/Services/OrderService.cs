using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Backend.Models.Exceptions;
using EComm.Contracts;
using EComm.Data;
using EComm.DTOs;
using EComm.Models;
using EComm.Models.Exceptions;
using EComm.Shared.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EComm.Services
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IPaymentService _paymentService;
        private readonly UserManager<AppUser> _userManager;

        private readonly ILogger<OrderService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public OrderService(ApplicationDbContext dbContext,
                            IPaymentService paymentService,
                            UserManager<AppUser> userManager,
                            ILogger<OrderService> logger,
                            IServiceProvider serviceProvider)
        {
            _dbContext = dbContext;
            _paymentService = paymentService;
            _userManager = userManager;
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        public async Task<PlaceOrderDto> PlaceOrder(string userId, CreateOrderDto orderDto)
        {
            // create an order entity then use the paymentService to initiate a payment using pay
            // paystack

            // 
            var user = await _userManager.Users.AsNoTracking().SingleOrDefaultAsync(u => u.Id == userId);
            var order = new Order { UserId = userId, TotalPrice = orderDto.TotalPrice, ShippingAddress = orderDto.shippingAddress, };
            var cartItemIds = orderDto.CreateOrderItemDtos.Select(i => i.CartItemId).ToList();
            var cartItems = await _dbContext.CartItems.Include(ci => ci.Product).Where(ci => cartItemIds.Contains(ci.Id)).ToListAsync();

            foreach (var item in cartItems)
            {
                if (!cartItemIds.Contains(item.Id))
                {
                    _logger.LogError($"CartItem with id : {item.Id} not found.");
                    throw new CartItemNotFoundException($"CartItem with Id : {item.Id} Does not Exist");
                }
                var orderItem = await _dbContext.OrderItems.Where(oi => oi.CartItemId.Equals(item.Id)).SingleOrDefaultAsync();
                if (orderItem is null)
                {
                     
                    orderItem = new OrderItem
                    {
                        OrderId = order.Id,
                        CartItemId = item.Id,
                        ProductName = item.Product.Name,
                        Quantity = item.Quantity,
                        UnitPrice = item.Product.Price
                    };
                }

                order.OrderItems.Add(orderItem);
            }

            // create new payment and then initiate a payment
            var payment = new Payment { OrderId = order.Id, AmountToPay = orderDto.TotalPrice };
            // initiate paystack payment 
            var response = await _paymentService.InitializePayment(payment, user.Email);
            if (!response.Status)
            {
                _logger.LogError("Payment initialization failed");
                throw new OrderFailedException("An Error Occured while trying to place the order");
            }
            await _dbContext.Payments.AddAsync(payment);
            await _dbContext.Orders.AddAsync(order);
            await _dbContext.SaveChangesAsync();

            return new PlaceOrderDto { CheckoutUrl = response.Data.AuthorizationUrl };

        }


        public async Task<IEnumerable<OrderDto>> GetOrders(string userId)
        {

            var orders = await _dbContext.Orders.Include(o=>o.OrderItems).Include(o=>o.Payment).AsNoTracking().ToListAsync();
            var ordersDto = new List<OrderDto>();
            foreach(var order in orders)
            {
                var orderItemDtos = order.OrderItems.Select(oi => new OrderItemDto
                                                {
                                                    Id = oi.Id,
                                                    ProductName = oi.ProductName,
                                                    Quantity = oi.Quantity,
                                                    UnitPrice = oi.UnitPrice
                                                }).ToList();
                var orderDto = new OrderDto { Id = order.Id, 
                                              OrderItemDtos = orderItemDtos, 
                                              CreatedAt = order.CreatedAt, 
                                              TotalPrice = order.TotalPrice 
                                            };
                ordersDto.Add(orderDto);
            }

            return ordersDto;
            
        }
        

        // public async Task CancelOrder(Guid orderId)
        // {
        //     var order = await _dbContext.Orders.Where(o=> o.Id.Equals(orderId)).SingleOrDefaultAsync();
        //     // var order = await _dbContext.Orders.Where(o => o.OrderItems.First().CartItemId).SingleOrDefaultAsync();
        //     if (order is null)
        //     {
        //         _logger.LogError($"The order with id {orderId} not found");
        //         throw new OrderNotFoundException("The order does not Exist");
        //     }
        //     _dbContext.Orders.Remove(order);
        // }
    }
}