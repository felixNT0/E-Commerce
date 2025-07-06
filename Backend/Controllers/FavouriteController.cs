using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.DTOs;
using EComm.Extensions;
using EComm.Models.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EComm.Controllers
{
    [ApiController]
    [Route("api/favourites")]
    public class FavouriteController : ControllerBase
    {
        private readonly ILogger<FavouriteController> _logger;
        private readonly IFavouriteService _favouriteService;

        public FavouriteController(
            ILogger<FavouriteController> logger,
            IFavouriteService favouriteService
        )
        {
            _logger = logger;
            _favouriteService = favouriteService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddToFavourites(CreateFavouriteDto favouriteDto)
        {
            try
            {
                var userId = User.GetUserId();
                var favouritesDto = await _favouriteService.AddToUsersFavourite(
                    userId,
                    favouriteDto
                );
                return Ok(favouritesDto);
            }
            catch (Exception e)
            {
                _logger.LogError(
                    $"An Error occured while trying to Add this product to the Users Favourites : {e.Message}"
                );
                return StatusCode(
                    500,
                    $"An Error occured while trying to Add this product to the Users Favourites : {e.Message}"
                );
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUsersFavouriteProducts()
        {
            try
            {
                // TODO: We are going to get the userId from the logiin token and then use it
                // rather than from the dto contract
                var userId = User.GetUserId();
                var favouritesDto = await _favouriteService.GetUsersFavourites(userId);
                return Ok(favouritesDto);
            }
            catch (Exception e)
            {
                _logger.LogError(
                    $"An Error occured while trying to get the Users favorite products : {e.Message}"
                );
                return StatusCode(
                    500,
                    $"An Error occured while trying to get the Users favorite products : {e.Message}"
                );
            }
        }

        [HttpDelete("{productId:Guid}")]
        [Authorize]
        public async Task<IActionResult> RemoveProductFromUsersFavourites(Guid productId)
        {
            try
            {
                // TODO: We are going to get the userId from the logiin token and then use it
                // rather than from the dto contract
                var userId = User.GetUserId();
                await _favouriteService.RemoveFavourite(userId, productId);
                return NoContent();
            }
            catch (FavouriteNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (ProductNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (Exception e)
            {
                _logger.LogError(
                    $"An Error occured while trying to Delete the product with id {productId} from the Users favorites  : {e.Message}"
                );
                return StatusCode(500, e.Message);
            }
        }
    }
}
