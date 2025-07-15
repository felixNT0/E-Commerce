using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.DTOs;

namespace EComm.App.Contracts
{
    public interface IFavouriteService
    {
        Task<FavouriteDto> AddToUsersFavourite(string userId, CreateFavouriteDto favouriteDto);
        Task<IEnumerable<ProductDto>> GetUsersFavourites(string userId);
        Task RemoveFavourite(string userId, Guid productId);
    }
}
