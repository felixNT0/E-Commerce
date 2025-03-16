using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.DTOs;

namespace EComm.Contracts
{
    public interface IProductService
    {
        Task<CreatedProductDto> CreateProductAsync(CreateProductDto productDto);  
        Task<ProductDto> GetProductByIdAsync(Guid productId); 
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> UpdateProductAsync(Guid productId, UpdateProductDto productDto);
        Task<IEnumerable<ProductDto>> GetProductsByCategoryAsync(int categoryId);

        Task DeleteProductAsync(Guid id);
    }
}