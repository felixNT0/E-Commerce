using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.DTOs
{
    public record NotifyUserDto
    {
        public string? Status { get; set; } = string.Empty;

        public string Message { get; set; }
    }
}