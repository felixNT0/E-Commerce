using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record AddToCartDto
    {
        public Guid ProductId { get; set; }
    }
}
