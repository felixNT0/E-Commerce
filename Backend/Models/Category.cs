using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Product?> Products { get; set; } = [];
    }
}