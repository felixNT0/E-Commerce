using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.DTOs;
using EComm.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;


namespace EComm.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly ILogger<CartController> _logger;
        private readonly ICartService _cartService;

        public CartController(ILogger<CartController> logger, ICartService cartService)
        {
            _logger = logger;
            _cartService = cartService;
        }

        [HttpPost]
        public async Task<IActionResult> AddToCart(AddToCartDto cartDto)
        {
            try
            {
                await _cartService.AddCartItemAsync(cartDto.ProductId, cartDto.UserId);
                return Created("", new { message = "Item added to cart successfully" });
            }
            catch (ProductNotFoundException e)
            {

                return NotFound(e.Message);
            }
            catch (CartNotFoundException e)
            {

                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return StatusCode(500, $"An Error occured while trying to add an item to the cart {e.Message}");
            }


        }

        [HttpGet]
        public async Task<IActionResult> GetCart(string userId)
        {
            try
            {
                var cart = await _cartService.GetCartAsync(userId);
                var response = new { Count = cart.CartItems.Count, Cart = cart };
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError($"An Error Occured while trying to get the users Cart : {e.Message}");
                return StatusCode(500, $"An Error Occured while trying to get the users Cart : {e.Message}");

            }
        }

        [HttpPost("collection")]
        public async Task<IActionResult> AddToCartCollection(AddToCartCollectionDto addToCartCollectionDto)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var cartCollection = await _cartService.AddToCartCollectionAsync(addToCartCollectionDto.UserId, addToCartCollectionDto);
                return Created("", new { cartItems = cartCollection.cartItems });

            }
            catch (CartNotFoundException e)
            {
                _logger.LogError(e.Message);
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, $"An Error occured while trying to add collection of cartItems to the cart");
            }
        }

        [HttpDelete("{cartItemId:Guid}")]
        public async Task<IActionResult> RemoveCartItem(string userId, Guid cartItemId)
        {
            try
            {
                await _cartService.RemoveCartItem(userId, cartItemId);
                return NoContent();
            }
            catch (CartItemNotFoundException e)
            {
                _logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
            catch (CartNotFoundException e)
            {
                _logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, $"An Error occured while trying to remove the cartItems from the cart");
            }
        }

        [HttpPut("{cartItemId:Guid}")]
        public async Task<IActionResult> UpdateCartItem(Guid cartItemId, [FromBody] UpdateCartItemDto cartItemDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await _cartService.UpdateCartItemAsync(cartItemId, cartItemDto);
                return NoContent();
            }
            catch (CartNotFoundException e)
            {
                _logger.LogError(e, e.Message);
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, $"An Error occured while trying to Update the cartItem ");
            }
        }

        [HttpDelete("clear")]
        public async Task<IActionResult> ClearCart(string userId)
        {
            try
            {
                await _cartService.ClearCartAsync(userId);
                return NoContent();
            }
            catch (CartNotFoundException e)
            {
                _logger.LogError(e.Message);
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);
                return StatusCode(500, $"An error occurred while clearing the cart");
            }
        }

    }
}