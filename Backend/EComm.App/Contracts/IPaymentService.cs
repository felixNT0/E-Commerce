using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Models;
using EComm.App.Shared.Models;

namespace EComm.App.Contracts
{
    public interface IPaymentService
    {
        Task<TransactionInitializationResponse> InitializePayment(
            Payment payment,
            string userEmail
        );
    }
}
