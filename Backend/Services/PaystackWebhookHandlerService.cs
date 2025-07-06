using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Backend.Models.Exceptions;
using EComm.Contracts;
using EComm.Data;
using EComm.Models;
using EComm.Models.Exceptions;
using EComm.Shared.Enums;
using EComm.Shared.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace EComm.Services
{
    public class PaystackWebhookHandlerService : IPaystackWebhookHandlerService
    {
        private readonly string? _secret;
        private readonly ILogger<PaystackWebhookHandlerService> _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IHubContext<NotificationHub, INotificationClient> _hubContext;
        private readonly INotificationService _notificationService;

        public PaystackWebhookHandlerService(
            IConfiguration config,
            ILogger<PaystackWebhookHandlerService> logger,
            ApplicationDbContext dbContext,
            IHubContext<NotificationHub, INotificationClient> hubContext,
            INotificationService notificationService
        )
        {
            _secret = config["PaystackSettings:SecretKey"];
            _logger = logger;
            _dbContext = dbContext;
            _hubContext = hubContext;
            _notificationService = notificationService;
        }

        public async Task HandleEvent(PaystackWebhookEvent eventPayload)
        {
            var reference = Guid.Parse(eventPayload.Data.Reference);
            var payment = await _dbContext
                .Payments.Where(p => p.TransactionId.Equals(reference))
                .Include(p => p.Order)
                .ThenInclude(o => o.OrderItems)
                .SingleOrDefaultAsync();

            if (payment is null)
            {
                _logger.LogError($"payment with referenceId {reference} does not exist");
                throw new PaymentNotFoundException("Payment does not Exist");
            }
            if (eventPayload.Event == "charge.success")
            {
                // check if paid amount is the appropraite Amount
                if (eventPayload.Data.Amount >= payment.AmountToPay)
                {
                    payment.PaymentStatus = PaymentStatus.Success;
                }
                else if (eventPayload.Data.Amount < payment.AmountToPay)
                {
                    payment.PaymentStatus = PaymentStatus.PartialPaid;
                }

                payment.AmountPaid = eventPayload.Data.Amount;
                payment.PaymentMethod = eventPayload.Data.Channel;
                await ClearOrderItemsFromCart(payment.Order);
                await _dbContext.SaveChangesAsync();
                await _notificationService.NotifyUserAsync(
                    payment.Order.UserId,
                    $"Payment of {payment.AmountPaid / 100} for your order was successfull",
                    "Successful"
                );
            }
        }

        public bool VerifySignature(string request, string signature)
        {
            var hash = GenerateHmacSHA512(request, _secret);
            return hash == signature;
        }

        private string GenerateHmacSHA512(string request, string secret)
        {
            byte[] secretKeyBytes = Encoding.UTF8.GetBytes(secret);
            string inputString = Convert.ToString(new JValue(request));
            byte[] inputStringBytes = Encoding.UTF8.GetBytes(inputString);

            using (var hmac = new HMACSHA512(secretKeyBytes))
            {
                var hash = hmac.ComputeHash(inputStringBytes);
                return BitConverter.ToString(hash).Replace("-", string.Empty).ToLower();
            }
        }

        private async Task ClearOrderItemsFromCart(Order order)
        {
            // loop through the order orderItems and then clear the cartItems and decrease the product quantity
            foreach (var item in order.OrderItems)
            {
                var cartItem = await _dbContext
                    .CartItems.Include(ci => ci.Product)
                    .Where(ci => ci.Id.Equals(item.CartItemId))
                    .SingleOrDefaultAsync();
                if (cartItem is null)
                {
                    _logger.LogError("CartItem not found.");
                    throw new CartItemNotFoundException("CartItem does not exist");
                }
                var product = cartItem.Product;
                // decrease the product Quantity
                // TODO: safe check the product Quantity
                product.Quantity -= cartItem.Quantity;

                // delete the cartItem
                _dbContext.CartItems.Remove(cartItem);
            }
        }

        // private async Task NotifyUser(Payment payment)
        // {
        //     var order = await _dbContext.Orders.Where(o=> o.Id.Equals(payment.OrderId)).AsNoTracking().SingleOrDefaultAsync();
        //     await  _hubContext.Clients.User(order.UserId).PaymentNotification($"Payment of {payment.AmountPaid} for your order was successfull");

        // }
    }
}
