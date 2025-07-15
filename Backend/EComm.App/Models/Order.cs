using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models
{
    public class Order
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string UserId { get; set; }

        public List<OrderItem> OrderItems { get; set; } = [];

        [Column(TypeName = "decimal(12, 2)")]
        public decimal TotalPrice { get; set; }

        public string ShippingAddress { get; set; }

        public Payment? Payment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
