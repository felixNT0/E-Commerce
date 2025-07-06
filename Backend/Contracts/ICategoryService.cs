using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.DTOs;

namespace EComm.Contracts
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetCategoriesAsync();
    }
}
