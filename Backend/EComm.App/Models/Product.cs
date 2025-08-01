using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models
{
    public class Product
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public int? CategoryId { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        public Image? Image { get; set; }

        public string? ImageUrl { get; set; }

        [MaxLength(450)]
        public string? Description { get; set; }

        public int Quantity { get; set; }

        public List<CartItem?> CartItems { get; set; }

        public Category? Category { get; set; }

        public List<Favourite?> Favourites { get; set; } = [];
    }
}
