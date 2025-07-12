using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models
{
    public class CartItem
    {
        public Guid Id { get; set; }

        public Guid CartId { get; set; }
        public Cart Cart { get; set; }

        public Guid ProductId { get; set; }

        public Product Product { get; set; }

        public OrderItem? OrderItem { get; set; }

        public int Quantity { get; set; } = 1;
    }
}
