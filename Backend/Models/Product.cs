using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models
{
    public class Product
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public int? CategoryId { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }
        [Column(TypeName="decimal(10,2)")]

        public decimal Price { get; set; }

        public Image? Image { get; set; }

        [MaxLength(450)]
        public string? Description { get; set; }
    
        public Category? Category { get; set; }

    }
}