using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.DTOs;
using EComm.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace EComm.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(CreateProductDto productDto)
        {
            if(!ModelState.IsValid)
                return BadRequest();
            try
            {
                var createdProductDto = await _productService.CreateProductAsync(productDto);
                return Ok(createdProductDto);
            }
            catch(CategoryNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ImageProcessingException e)
            {
                
                return BadRequest(e.Message);
            }
            catch(Exception e)
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
            catch(NullReferenceException e)
            {
                return StatusCode(404, e.Message);
            }
            catch (System.Exception e)
            {
                return StatusCode(500, $"An Error Occured while trying to get the product: {e.Message}");
            }
            

        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var productsDto = await _productService.GetAllProductsAsync();
            return Ok(productsDto);
        }


        [HttpPut("{id:Guid}")]
        public async Task<IActionResult> UpdateProduct(Guid id, UpdateProductDto productDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            try
            {
                var updatedProduct = await _productService.UpdateProductAsync(id, productDto);
                return NoContent();
            }
            catch(ProductNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch(ProductUpdateException e)
            {
                return StatusCode(500, $"An Error occured while trying to update the product : {e.Message}");
            }
            catch (Exception e)
            {
                
                return StatusCode(500, $"An Error occured while trying to update the product : {e.Message}");
            }

        }

        [HttpDelete("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                return NoContent();
            }
            catch (ProductNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ProductDeletionException e)
            {
                return StatusCode(500, $"An Error Ocurred while trying to Delete the product");
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An Error Ocurred while trying to Delete the product : {e.Message}");
            }
            
        }
    }
}