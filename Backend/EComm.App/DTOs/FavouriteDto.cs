using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record FavouriteDto
    {
        public string UserId { get; set; }

        public CreatedProductDto Product { get; set; }
    }
}
