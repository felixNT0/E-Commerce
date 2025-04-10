using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace EComm.DTOs
{
    public record CreateOrderDto
    {

        public string shippingAddress { get; set; }

        public List<CreateOrderItemDto> CreateOrderItemDtos { get; set; }

        public decimal TotalPrice { get; set; }

    }
}