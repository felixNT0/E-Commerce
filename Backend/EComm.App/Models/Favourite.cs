using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Models
{
    public class Favourite
    {
        public Guid Id { get; set; }

        // one to one Relationship to Users Table

        public string UserId { get; set; }

        public List<Product> Products { get; set; } = [];
    }
}
