using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Shared.Models;

namespace EComm.Contracts
{
    public interface IPaystackWebhookHandlerService
    {
        bool VerifySignature(string request, string signature);

        Task HandleEvent(PaystackWebhookEvent eventPayload);
    }
}
