using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Models;

namespace EComm.App.Contracts
{
    public interface IJwtTokenService
    {
        Task<string> GenerateToken(AppUser user);
    }
}
