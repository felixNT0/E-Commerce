using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.DTOs;
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

        public FavouriteController(ILogger<FavouriteController> logger, IFavouriteService favouriteService)
        {
            _logger = logger;
            _favouriteService = favouriteService;
        }

        [HttpPost("addToFavourites")]
        public async Task<IActionResult> AddToFavourites(CreateFavouriteDto favouriteDto)
        {
            try
            {
                var favouritesDto = await _favouriteService.AddToUsersFavourite(favouriteDto);
                return Ok(favouritesDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An Error occured while trying to Add this product to the Users Favourites : {e.Message}");
            }

        }

        [HttpGet("getFavourites")]
        public async Task<IActionResult> GetUsersFavouriteProducts(string userId)
        {
            try
            {
                var favouritesDto = await _favouriteService.GetUsersFavourites(userId);
                return Ok(favouritesDto);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An Error occured while trying to Add this product to the Users Favourites : {e.Message}");
            }

        }

    }
}