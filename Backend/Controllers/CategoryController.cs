using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Extensions;
using EComm.Models.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;

namespace EComm.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(IProductService productService, 
                                  ICategoryService categoryService,
                                  ILogger<CategoryController> logger)
        {
            _productService = productService;
            _categoryService = categoryService;
            _logger = logger;
        }

        [HttpGet("{id:int}/products")]
        [OutputCache(Duration = 60, Tags = new[] {"productsByCategoryList"})]
        public async Task<IActionResult> GetCategoryProducts(int id, int page = 1, int pageSize = 10)
        {
            try
            {
                var productsDto = await  _productService.GetProductsByCategoryAsync(id, page, pageSize); 
                return Ok(productsDto);   
            }
            catch (Exception e)
            {
                _logger.LogError($"An Error occured while trying to get the products for category {id} : {e.Message}");
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
                _logger.LogError($"An Error Occured while trying to get the Categories : {e.Message} ");
                return StatusCode(500, $"An Error Occured while trying to get the Categories : {e.Message} ");
            }
        }
        
    }
}