using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models.Exceptions
{
    public class ImageProcessingException : Exception
    {
        public ImageProcessingException(string message) : base(message)
        {
            
        }
    }
}