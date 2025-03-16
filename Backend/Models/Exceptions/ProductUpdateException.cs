using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models.Exceptions
{
    public class ProductUpdateException : Exception
    {
        public ProductUpdateException(string message) : base(message)
        {
            
        }
    }
}