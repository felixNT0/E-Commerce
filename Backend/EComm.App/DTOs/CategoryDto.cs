using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
