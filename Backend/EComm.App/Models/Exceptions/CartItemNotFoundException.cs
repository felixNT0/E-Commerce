using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models.Exceptions
{
    public class CartItemNotFoundException : Exception
    {
        public CartItemNotFoundException(string message)
            : base(message) { }
    }
}
