using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Models;
using EComm.Shared.Models;

namespace EComm.Contracts
{
    public interface IPaymentService
    {
        Task<TransactionInitializationResponse> InitializePayment(
            Payment payment,
            string userEmail
        );
    }
}
