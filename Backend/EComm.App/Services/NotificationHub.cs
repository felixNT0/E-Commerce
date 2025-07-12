using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Contracts;
using Microsoft.AspNetCore.SignalR;

namespace EComm.App.Services
{
    public class NotificationHub : Hub<INotificationClient> { }
}
