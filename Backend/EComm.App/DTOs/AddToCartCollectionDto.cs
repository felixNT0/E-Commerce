using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record AddToCartCollectionDto
    {
        public List<CreateCartItemDto> CartItemDtos { get; set; }
    }
}
