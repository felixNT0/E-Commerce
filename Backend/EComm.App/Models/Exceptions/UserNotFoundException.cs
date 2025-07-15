using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException(string message)
            : base(message) { }
    }
}
