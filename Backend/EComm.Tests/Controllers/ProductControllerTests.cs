using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using EComm.App.Contracts;
using EComm.App.Controllers;
using EComm.App.DTOs;
using EComm.App.Models.Exceptions;
using FakeItEasy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.Extensions.Logging;
using Xunit;

namespace EComm.Tests.Controllers
{
    public class ProductControllerTests
    {
        private readonly IProductService _service;
        private readonly IOutputCacheStore _cache;
        private readonly ILogger<ProductController> _logger;
        private readonly ProductController _controller;

        public ProductControllerTests()
        {
            _service = A.Fake<IProductService>();
            _cache = A.Fake<IOutputCacheStore>();
            _logger = A.Fake<ILogger<ProductController>>();
            _controller = new ProductController(_service, _logger, _cache);
        }

        [Fact]
        public async Task CreateProduct_WithValidData_ReturnsCreatedAt()
        {
            var dto = new CreateProductDto
            {
                Name = "Laptop",
                Price = 1999.99m,
                Category = "Electronics",
                Image = null,
                Description = "A good laptop",
            };

            var created = new CreatedProductDto
            {
                Id = Guid.NewGuid(),
                ProductName = dto.Name,
                Price = dto.Price,
                Category = dto.Category,
                ImageUrl = "url",
            };

            A.CallTo(() => _service.CreateProductAsync(dto)).Returns(created);

            var result = await _controller.CreateProduct(dto);

            var createdResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(created.Id, ((CreatedProductDto)createdResult.Value).Id);
        }

        [Fact]
        public async Task CreateProduct_WithInvalidCategory_ReturnsNotFound()
        {
            var dto = new CreateProductDto { Category = "Invalid" };

            A.CallTo(() => _service.CreateProductAsync(dto))
                .Throws(new CategoryNotFoundException("Category not found"));

            var result = await _controller.CreateProduct(dto);

            var notFound = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("Category not found", notFound.Value);
        }

        [Fact]
        public async Task GetProduct_WithValid_ProductId_ReturnsOk()
        {
            //Arrange
            var id = Guid.NewGuid();
            var dto = new ProductDto
            {
                Id = id,
                ProductName = "Nokia X30",
                Price = 99.00m,
                ImageUrl = "nokia_img",
                Description = "Glass front (Gorilla Glass Victus), aluminum frame, plastic back",
                Category = "mobile phones",
            };

            A.CallTo(() => _service.GetProductByIdAsync(id)).Returns(dto);

            //Act
            var result = await _controller.GetProduct(id);

            //Assert
            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(dto, ok.Value);
        }

        [Fact]
        public async Task GetProduct_WithInValid_ProductId_ReturnsNotFound()
        {
            // Arrange
            var productId = Guid.NewGuid();
            A.CallTo(() => _service.GetProductByIdAsync(productId))
                .Throws(new NullReferenceException("The product with id: does not Exist"));

            // Act
            var result = await _controller.GetProduct(productId);

            // Assert
            var notFoundResult = Assert.IsType<ObjectResult>(result);
            Assert.Equal(404, notFoundResult.StatusCode);
            Assert.Equal("The product with id: does not Exist", notFoundResult.Value);
        }

        [Fact]
        public async Task GetProducts_ReturnsPagedList()
        {
            var response = new PagedResultsDto<ProductDto>
            {
                TotalCount = 1,
                PageSize = 10,
                PageNumber = 1,
                Items = new List<ProductDto> { new ProductDto() },
                Pages = 1,
            };

            A.CallTo(() => _service.GetAllProductsAsync(1, 10)).Returns(response);

            var result = await _controller.GetProducts(1, 10);

            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(response, ok.Value);
        }

        [Fact]
        public async Task ProductSearch_WithValidQuery_ReturnsResults()
        {
            var searchDto = new ProductSearchDto
            {
                Query = "phone",
                Page = 1,
                PageSize = 10,
            };
            var resultList = new PagedResultsDto<ProductDto>
            {
                Items = new List<ProductDto>(),
                TotalCount = 0,
                PageSize = 10,
                PageNumber = 1,
                Pages = 0,
            };

            A.CallTo(() => _service.SearchProducts(searchDto)).Returns(resultList);

            var result = await _controller.ProductSearch(searchDto);

            var ok = Assert.IsType<OkObjectResult>(result);
            Assert.Equal(resultList, ok.Value);
        }

        [Fact]
        public async Task DeleteProduct_WithValid_ProductId_ReturnsNoContent()
        {
            var id = Guid.NewGuid();
            A.CallTo(() => _service.DeleteProductAsync(id)).Returns(Task.CompletedTask);

            var result = await _controller.DeleteProduct(id);
            Assert.IsType<NoContentResult>(result);
        }

        [Fact]
        public async Task DeleteProduct_WithInValid_ProductId_ReturnsNotFound()
        {
            // Arrange
            var productId = Guid.NewGuid();
            A.CallTo(() => _service.DeleteProductAsync(productId))
                .Throws(
                    new ProductNotFoundException($"The product with id: {productId} does not Exist")
                );

            // Act
            var result = await _controller.DeleteProduct(productId);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal($"The product with id: {productId} does not Exist", notFoundResult.Value);
        }
    }
}
