using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.DTOs;

namespace EComm.Contracts
{
    public interface IFavouriteService
    {
        Task<FavouriteDto> AddToUsersFavourite(CreateFavouriteDto favouriteDto);
        Task<IEnumerable<ProductDto>> GetUsersFavourites(string userId);
        Task RemoveFavourite(string userId, Guid productId);
    }
}