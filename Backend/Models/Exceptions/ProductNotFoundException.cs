using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models.Exceptions
{
    public class ProductNotFoundException : Exception
    {
        public ProductNotFoundException(string message)
            : base(message) { }
    }
}
