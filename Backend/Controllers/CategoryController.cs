using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Extensions;
using EComm.Models.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EComm.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;

        public CategoryController(IProductService productService, ICategoryService categoryService)
        {
            _productService = productService;
            _categoryService = categoryService;
        }

        [HttpGet("{id:int}/products")]
        public async Task<IActionResult> GetCategoryProducts(int id)
        {
            try
            {
                var productsDto = await  _productService.GetProductsByCategoryAsync(id); 
                return Ok(productsDto);   
            }
            catch (Exception e)
            {
                
                return StatusCode(500, $"An Error occured while trying to get the products for category {id} : {e.Message}");
            }
            

        }

        [HttpGet]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var categoryDtos = await _categoryService.GetCategoriesAsync();
                return Ok(categoryDtos);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An Error Occured while trying to get the Categories : {e.Message} ");
            }
        }
        
    }
}