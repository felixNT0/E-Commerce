using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models.Exceptions
{
    public class InvalidUserCredentialsException : Exception
    {
        public InvalidUserCredentialsException(string message)
            : base(message) { }
    }
}
