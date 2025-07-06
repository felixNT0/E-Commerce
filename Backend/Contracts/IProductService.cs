using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.DTOs;
using EComm.Shared.Models;

namespace EComm.Contracts
{
    public interface IProductService
    {
        Task<CreatedProductDto> CreateProductAsync(CreateProductDto productDto);
        Task<ProductDto> GetProductByIdAsync(Guid productId);
        Task<PagedResultsDto<ProductDto>> SearchProducts(ProductSearchDto searchDto);
        Task<PagedResultsDto<ProductDto>> GetAllProductsAsync(int page, int pageSize);
        Task<ProductDto> UpdateProductAsync(Guid productId, UpdateProductDto productDto);
        Task<PagedResultsDto<ProductDto>> GetProductsByCategoryAsync(
            int categoryId,
            int page,
            int pageSize
        );

        Task DeleteProductAsync(Guid id);
    }
}
