using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.DTOs
{
    public record UpdateProductDto
    {
        [MaxLength(20)]
        public string Name { get; set; }

        [Range(
            0,
            9999999999.99,
            ErrorMessage = "Price must be a maximum of 10 digits with 2 decimal places."
        )]
        public decimal Price { get; set; }

        public IFormFile? Image { get; set; }

        [MaxLength(150)]
        public string Description { get; set; }

        public string Category { get; set; }
    }
}
