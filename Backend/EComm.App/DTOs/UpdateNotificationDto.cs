using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record UpdateNotificationDto
    {
        public bool IsRead { get; set; }
    }
}
