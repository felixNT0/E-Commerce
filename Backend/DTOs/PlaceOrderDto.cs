using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.DTOs
{
    public record PlaceOrderDto
    {
        public string CheckoutUrl { get; set; }
    }
}