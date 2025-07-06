using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Models;

namespace EComm.Contracts
{
    public interface IJwtTokenService
    {
        Task<string> GenerateToken(AppUser user);
    }
}
