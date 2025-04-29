using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models.Exceptions
{
    public class FavouriteNotFoundException : Exception
    {
        public FavouriteNotFoundException(string message) : base(message)
        {
            
        }
    }
}