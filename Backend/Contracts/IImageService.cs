using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Models;

namespace EComm.Contracts
{
    public interface IImageService
    {
        Task<Image> CreateImageAsync(IFormFile image);
    }
}
