using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models.Exceptions
{
    public class NotificationNotFoundException : Exception
    {
        public NotificationNotFoundException(string message)
            : base(message) { }
    }
}
