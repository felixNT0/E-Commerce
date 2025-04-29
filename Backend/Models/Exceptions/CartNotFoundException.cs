using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models.Exceptions
{
    public class CartNotFoundException : Exception
    {
        public CartNotFoundException(string message) : base(message)
        {
            
        }
    }
}