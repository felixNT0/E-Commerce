using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record CartDto
    {
        public List<CartItemDto> CartItems { get; set; } = [];
    }
}
