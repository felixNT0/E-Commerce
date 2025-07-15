using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Shared.Models;

namespace EComm.App.Contracts
{
    public interface IPaystackWebhookHandlerService
    {
        bool VerifySignature(string request, string signature);

        Task HandleEvent(PaystackWebhookEvent eventPayload);
    }
}
