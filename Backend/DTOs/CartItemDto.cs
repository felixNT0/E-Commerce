using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.DTOs
{
    public record CartItemDto
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public string ProductCategory { get; set; }
        public decimal ProductPrice { get; set; }
        public int ProductQuantity { get; set; }

        public string ImageUrl { get; set; }
    }
}
