using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record ProductDto
    {
        public Guid Id { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }
    }
}
