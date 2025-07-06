using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using EComm.DTOs;

namespace EComm.DTOs
{
    public record CreateProductDto
    {
        [MaxLength(
            100,
            ErrorMessage = "The name of the Product cannot be more than 100 characters"
        )]
        public string Name { get; set; }

        [Range(
            0,
            9999999999.99,
            ErrorMessage = "Price must be a maximum of 10 digits with 2 decimal places."
        )]
        public decimal Price { get; set; }

        public string Category { get; set; }

        public IFormFile? Image { get; set; }

        [MaxLength(150)]
        public string? Description { get; set; }
    }
}
