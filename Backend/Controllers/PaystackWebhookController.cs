using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Shared.Models;
using Microsoft.AspNetCore.Mvc;


namespace EComm.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PaystackWebhookController : ControllerBase
    {
        private readonly IPaystackWebhookHandlerService _webhookService;
        private readonly ILogger<PaystackWebhookController> _logger;
        private readonly IBackgroundTaskQueue _queue;

        public PaystackWebhookController(IPaystackWebhookHandlerService webhookService,
                                        ILogger<PaystackWebhookController> logger,
                                        IBackgroundTaskQueue backgroundTaskQueue)
        {

            _webhookService = webhookService;
            _logger = logger;
            _queue = backgroundTaskQueue;

        }

        [HttpPost]
        public async Task<IActionResult> ReceiveWebhook()
        {
            var signature = Request.Headers["x-paystack-signature"].ToString();
            using var reader = new StreamReader(Request.Body);

            var json = await reader.ReadToEndAsync();

            if (string.IsNullOrEmpty(json))
            {
                return BadRequest("Payload is empty.");
            }



            var isValid = _webhookService.VerifySignature(json, signature);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            if (!isValid)
            {
                return Unauthorized();
            }
            try
            {
                var eventPayload = JsonSerializer.Deserialize<PaystackWebhookEvent>(json, options);

                _queue.Enqueue(async serviceProvider =>
                {
                    try
                    {
                        var webhookService = serviceProvider.GetRequiredService<IPaystackWebhookHandlerService>();
                        await webhookService.HandleEvent(eventPayload);
                    }
                    catch(Exception e)
                    {
                        _logger.LogError(e.StackTrace, $"An Error Occured while Trying to Execute the background Task {e.Message}");
                    }

                });
                return Ok();
            }
            catch (Exception e)
            {
                _logger.LogError($"An Error occurred : {e.Message}");
                return Ok();
            }
        }
    }
}