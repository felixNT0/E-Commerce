using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Contracts;
using EComm.App.DTOs;
using EComm.App.Models.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.OutputCaching;

namespace EComm.App.Controllers
{
    [ApiController]
    [Route("/api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IOutputCacheStore _cache;
        private readonly ILogger<ProductController> _logger;

        public ProductController(
            IProductService productService,
            ILogger<ProductController> logger,
            IOutputCacheStore cache
        )
        {
            _productService = productService;
            _cache = cache;
            _logger = logger;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateProduct(CreateProductDto productDto)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            try
            {
                var createdProductDto = await _productService.CreateProductAsync(productDto);
                await _cache.EvictByTagAsync("productsList", CancellationToken.None);
                await _cache.EvictByTagAsync("productsByCategoryList", CancellationToken.None);
                return CreatedAtAction(
                    nameof(GetProduct),
                    new { Id = createdProductDto.Id },
                    createdProductDto
                );
            }
            catch (CategoryNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ImageProcessingException e)
            {
                return BadRequest(e.Message);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An error occured while creating the Product {e.Message}");
            }
        }

        [HttpGet("{id:Guid}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            try
            {
                var productDto = await _productService.GetProductByIdAsync(id);
                return Ok(productDto);
            }
            catch (NullReferenceException e)
            {
                return StatusCode(404, e.Message);
            }
            catch (System.Exception e)
            {
                return StatusCode(
                    500,
                    $"An Error Occured while trying to get the product: {e.Message}"
                );
            }
        }

        [HttpGet]
        [OutputCache(Duration = 60, Tags = new[] { "productsList" })]
        public async Task<IActionResult> GetProducts(int page = 1, int pageSize = 10)
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than 0.");

            var result = await _productService.GetAllProductsAsync(page, pageSize);
            return Ok(result);
        }

        [HttpPut("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(Guid id, UpdateProductDto productDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var updatedProduct = await _productService.UpdateProductAsync(id, productDto);
                await _cache.EvictByTagAsync("productsList", CancellationToken.None);
                await _cache.EvictByTagAsync("productsByCategoryList", CancellationToken.None);
                return NoContent();
            }
            catch (ProductNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ProductUpdateException e)
            {
                return StatusCode(
                    500,
                    $"An Error occured while trying to update the product : {e.Message}"
                );
            }
            catch (Exception e)
            {
                return StatusCode(
                    500,
                    $"An Error occured while trying to update the product : {e.Message}"
                );
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> ProductSearch([FromQuery] ProductSearchDto searchDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var response = await _productService.SearchProducts(searchDto);
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError(
                    $"An Error Occured while trying to get Products with searhParameter {searchDto.Query} and MinPrice {searchDto.MinPrice} and MaxPrice {searchDto.MaxPrice} with error : {e.Message}"
                );
                return StatusCode(500, "An Error Occured while trying to get Products");
            }
        }

        [HttpDelete("{id:Guid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                await _cache.EvictByTagAsync("productsList", CancellationToken.None);
                await _cache.EvictByTagAsync("productsByCategoryList", CancellationToken.None);
                return NoContent();
            }
            catch (ProductNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ProductDeletionException e)
            {
                return StatusCode(
                    500,
                    $"An Error Ocurred while trying to Delete the product : {e.Message}"
                );
            }
            catch (Exception e)
            {
                return StatusCode(
                    500,
                    $"An Error Ocurred while trying to Delete the product : {e.Message}"
                );
            }
        }
    }
}
