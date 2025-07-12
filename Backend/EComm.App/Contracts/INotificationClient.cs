using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Contracts
{
    public interface INotificationClient
    {
        Task PaymentNotification(string status, string message);
    }
}
