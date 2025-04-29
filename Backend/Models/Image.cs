using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.Models
{
    public class Image
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string FilePath { get; set; }
        
        public string FileType { get; set; }

        public string Url { get; set; }
        
        public DateTime CreatedAt { get; set; }
        
        public Guid ProductId {get; set;}
    }
}