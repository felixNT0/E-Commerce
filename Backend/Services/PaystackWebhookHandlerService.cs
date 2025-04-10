using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Backend.Models.Exceptions;
using EComm.Contracts;
using EComm.Data;
using EComm.Models.Exceptions;
using EComm.Shared.Enums;
using EComm.Shared.Models;
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

        public PaystackWebhookHandlerService(IConfiguration config,
                                            ILogger<PaystackWebhookHandlerService> logger,
                                            ApplicationDbContext dbContext
                                            )
        {
            _secret = config["PaystackSettings:SecretKey"];
            _logger = logger;
            _dbContext = dbContext;
        }


        public async Task HandleEvent(PaystackWebhookEvent eventPayload)
        {
            var reference = Guid.Parse(eventPayload.Data.Reference);
            var payment = await _dbContext.Payments.Where(p => p.TransactionId.Equals(reference)).SingleOrDefaultAsync();

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
                await ClearOrderItemsFromCart(payment.Id);
                await _dbContext.SaveChangesAsync();

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

        private async Task ClearOrderItemsFromCart(Guid paymentId)
        {
            
            var order = await _dbContext.Orders.Include(o => o.Payment).Include(o=> o.OrderItems).Where(o => o.Payment.Id.Equals(paymentId)).SingleOrDefaultAsync();
            if (order is null)
            {
                _logger.LogError($"The order for the payment with payment id : {paymentId} was not Found");
                throw new OrderNotFoundException($"the Order for the payment does not exist");
            }
            // loop through the order orderItems and then clear the cartItems and decrease the product quantity
            foreach (var item in order.OrderItems)
            {
                var cartItem = await _dbContext.CartItems.Include(ci => ci.Product).Where(ci => ci.Id.Equals(item.CartItemId)).SingleOrDefaultAsync();
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
    }
}