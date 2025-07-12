using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models.Exceptions
{
    public class OrderFailedException : Exception
    {
        public OrderFailedException(string message)
            : base(message) { }
    }
}
