using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Models;
using EComm.Shared.Models;

namespace EComm.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly HttpClient _httpClient;

        public PaymentService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("Paystack");
        }

        public async Task<TransactionInitializationResponse> InitializePayment(
            Payment payment,
            string userEmail
        )
        {
            var paymentDetails = new
            {
                amount = (int)(payment.AmountToPay * 100),
                email = userEmail,
                reference = payment.TransactionId,
                currency = "NGN",
            };
            var option = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
                WriteIndented = true,
            };
            using StringContent json = new(
                JsonSerializer.Serialize(paymentDetails, option),
                Encoding.UTF8,
                MediaTypeNames.Application.Json
            );
            HttpResponseMessage postResponse = await _httpClient.PostAsync(
                "transaction/initialize",
                json
            );

            string responseBody = await postResponse.Content.ReadAsStringAsync();
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var response = JsonSerializer.Deserialize<TransactionInitializationResponse>(
                responseBody,
                options
            );

            return response;
        }
    }
}
