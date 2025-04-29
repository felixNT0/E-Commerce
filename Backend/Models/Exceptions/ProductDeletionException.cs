using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models.Exceptions
{
    public class ProductDeletionException : Exception
    {
        public ProductDeletionException(string message): base(message)
        {
            
        }   
    }
}