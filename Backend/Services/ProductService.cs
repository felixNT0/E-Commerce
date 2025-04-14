using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Data;
using EComm.DTOs;
using EComm.Models;
using EComm.Models.Exceptions;
using EComm.Shared.Models;
using Microsoft.EntityFrameworkCore;

namespace EComm.Services
{
    public class ProductService : IProductService
    {

        private readonly IImageService _imageService;
        private readonly ApplicationDbContext _dbContext;
        private readonly ILogger<ProductService> _logger;

        public ProductService(IImageService imageService, ApplicationDbContext dbContext, ILogger<ProductService> logger)
        {
            _imageService = imageService;
            _dbContext = dbContext;
            _logger = logger;
        }

        public async Task<CreatedProductDto> CreateProductAsync(CreateProductDto productDto)
        {
            var image = await _imageService.CreateImageAsync(productDto.Image);

            // TODO: Get the Category Specified in the DTO then add it the Product on Creation 
            var category = await _dbContext.Categories.SingleOrDefaultAsync(c => c.Name == productDto.Category);
            if (category is null)
            {
                _logger.LogError($" Category {productDto.Category} does not Exist");
                throw new CategoryNotFoundException($" Category {productDto.Category} does not Exist");
            }

            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Image = image,
                Description = productDto.Description,
                Category = category,
                ImageUrl = image.Url
            };

            await _dbContext.Products.AddAsync(product);
            await _dbContext.SaveChangesAsync();


            return new CreatedProductDto
            {
                Id = product.Id,
                ProductName = product.Name,
                ImageUrl = image.Url,
                Price = product.Price,
                Category = category.Name
            };
        }

        public async Task<ProductDto> GetProductByIdAsync(Guid productId)
        {
            Expression<Func<Product, bool>> condition = (p) => p.Id == productId;
            var product = await _dbContext.Products.Include(p => p.Category).AsNoTracking().SingleOrDefaultAsync(condition);
            if (product is null)
            {
                _logger.LogError($"The product with id: {productId} does not Exist");
                throw new NullReferenceException($"The product with id: {productId} does not Exist");
            }

            return new ProductDto
            {
                Id = product.Id,
                ImageUrl = product.ImageUrl ?? "testUrl",
                ProductName = product.Name,
                Description = product.Description,
                Price = product.Price,
                Category = product.Category?.Name ?? ""
            };
        }

        public async Task<PagedResultsDto<ProductDto>> GetProductsByCategoryAsync(int categoryId, int page, int pageSize)
        {
            var productCount = await _dbContext.Products.Where(p => p.CategoryId.Equals(categoryId)).CountAsync();
            var pages = (int)Math.Ceiling(productCount / (double)pageSize);
            var skipCondition = (page - 1) * pageSize;

            var products = await _dbContext.Products
                                            .Where(p => p.CategoryId.Equals(categoryId))
                                            .Skip(skipCondition)
                                            .Take(pageSize)
                                            .Include(p=> p.Category)
                                            .AsNoTracking()
                                            .ToListAsync();

            if (products is null)
            {
                return new PagedResultsDto<ProductDto>
                {
                    TotalCount = productCount,
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = []
                };
            }

            var productsList = products.Select(p => new ProductDto
            {
                Id = p.Id,
                ProductName = p.Name,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Description = p.Description,
                Category = p.Category?.Name ?? ""
            });

            return new PagedResultsDto<ProductDto>
            {
                TotalCount = productCount,
                PageSize = pageSize,
                PageNumber = page,
                Items = productsList,
                Pages = pages
            };

        }

        public async Task<PagedResultsDto<ProductDto>> GetAllProductsAsync(int page, int pageSize)
        {
            var productCount = await _dbContext.Products.CountAsync();
            var pages = (int)Math.Ceiling(productCount / (double)pageSize);
            var skipCondition = (page - 1) * pageSize;
            var products = await _dbContext.Products
                                           .Skip(skipCondition)
                                           .Take(pageSize)
                                           .Include(p=> p.Category)
                                           .AsNoTracking()
                                           .ToListAsync();
        
            if (products is null)
            {
                return new PagedResultsDto<ProductDto>
                {
                    TotalCount = productCount,
                    PageSize = pageSize,
                    PageNumber = page,
                    Items = []
                };
            }
            var productsList = products.Select(p => new ProductDto
            {
                Id = p.Id,
                ProductName = p.Name,
                ImageUrl = p.ImageUrl,
                Price = p.Price,
                Description = p.Description,
                Category = p.Category?.Name
            });
            // return productsList;
            return new PagedResultsDto<ProductDto>
            {
                TotalCount = productCount,
                PageSize = pageSize,
                PageNumber = page,
                Items = productsList,
                Pages = pages
            };
        }

        public async Task<ProductDto> UpdateProductAsync(Guid productId, UpdateProductDto productDto)
        {
            var product = await _dbContext.Products.Include(p => p.Image).Include(p => p.Category).FirstOrDefaultAsync(p => p.Id == productId);
            if (product is null)
            {
                _logger.LogError($"Product with the id : {productId} does not Exist");
                throw new ProductNotFoundException($"Product with the id : {productId} does not Exist");
            }
            var category = await _dbContext.Categories.SingleOrDefaultAsync(c => c.Name == productDto.Category);
            if (category is null)
            {
                _logger.LogError($" Category {productDto.Category} does not Exist");
                throw new CategoryNotFoundException($" Category {productDto.Category} does not Exist");
            }
            product.Name = productDto.Name;
            product.Price = productDto.Price;
            product.Description = productDto.Description;
            product.Category = category;

            if (productDto.Image != null)
            {
                if (product.Image != null)
                {
                    var oldImagePath = product.Image.FilePath;
                    if (File.Exists(oldImagePath))
                    {
                        File.Delete(oldImagePath);
                    }
                    else
                    {
                        _logger.LogError($"The Image file Path does not exist : {oldImagePath}");
                        throw new ProductUpdateException($"The Image file Path does not exist : {oldImagePath}");
                    }

                    _dbContext.Images.Remove(product.Image);

                }

                var newImage = await _imageService.CreateImageAsync(productDto.Image);
                product.Image = newImage;
                product.ImageUrl = newImage.Url;

            }
            await _dbContext.SaveChangesAsync();
            return new ProductDto { Id = product.Id, ProductName = product.Name, Price = product.Price, Description = product.Description, ImageUrl = product.ImageUrl };
        }

        public async Task DeleteProductAsync(Guid id)
        {
            Expression<Func<Product, bool>> condition = (p) => p.Id == id;
            var product = await _dbContext.Products.Include(p => p.Image).Include(p => p.Category).SingleOrDefaultAsync(condition);
            if (product is null)
            {
                _logger.LogError($"The product with id: {id} does not Exist");
                throw new ProductNotFoundException($"The product with id: {id} does not Exist");
            }
            if (product.Image != null)
            {
                var imagePath = product.Image.FilePath;
                if (File.Exists(imagePath))
                {
                    File.Delete(imagePath);
                }
                else
                {
                    _logger.LogError($"The Image file Path does not exist : {imagePath}");
                    throw new ProductDeletionException($"The Image file Path does not exist : {imagePath}");
                }
            }
            _dbContext.Remove(product);
            await _dbContext.SaveChangesAsync();
        }
    }
}