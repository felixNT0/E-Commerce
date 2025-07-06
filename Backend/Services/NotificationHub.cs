using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using Microsoft.AspNetCore.SignalR;

namespace EComm.Services
{
    public class NotificationHub : Hub<INotificationClient> { }
}
