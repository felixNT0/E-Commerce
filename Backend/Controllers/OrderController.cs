using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.DTOs;
using EComm.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EComm.Controllers
{
    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<OrderController> _logger;

        public OrderController(IOrderService orderService, ILogger<OrderController> logger)
        {
            _orderService = orderService;
            _logger = logger;
            
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PlaceOrder(CreateOrderDto orderDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var userId = User.GetUserId();
                var order = await _orderService.PlaceOrder(userId, orderDto);
                return Ok(order);

            }
            catch(TaskCanceledException e)
            {
                _logger.LogError(e.Message);
                return StatusCode(504, "Request timed out due to slow network. Please try again.");
            }
            catch(HttpRequestException e) when (e.InnerException is SocketException)
            {
                _logger.LogError(e.Message);
                return StatusCode(503, "No internet connection or network issue. Please check your connection and try again.");
            }
            catch (Exception e)
            {
                _logger.LogError(e.StackTrace, e.Message);
                return StatusCode(500, " An Error occured while trying to place the Order");   
            }

        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOrders(int page = 1, int pageSize = 10)
        {
            var userId = User.GetUserId();
            var response = await _orderService.GetOrders(userId, page, pageSize);
            return Ok(response);
        }

    }
}