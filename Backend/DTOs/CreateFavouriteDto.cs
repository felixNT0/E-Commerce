using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.DTOs
{
    public record CreateFavouriteDto
    {
        public string UserId { get; set; }

        public Guid ProductId { get; set; }
    }
}