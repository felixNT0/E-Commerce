using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record CreateCartItemDto
    {
        public Guid ProductId { get; set; }

        public int Quantity { get; set; }
    }
}
