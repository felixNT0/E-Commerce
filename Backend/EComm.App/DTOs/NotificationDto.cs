using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.DTOs
{
    public record NotificationDto
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }
        public string Message { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
