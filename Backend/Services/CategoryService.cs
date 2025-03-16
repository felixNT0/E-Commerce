using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Data;
using EComm.DTOs;
using Microsoft.EntityFrameworkCore;

namespace EComm.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext _dbContext;

        public CategoryService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<CategoryDto>> GetCategoriesAsync()
        {
            var categories =  await _dbContext.Categories.AsNoTracking().ToListAsync();
            if (categories is null)
                return [];
            var categoriesDto = categories.Select( c => new CategoryDto
                                                {   
                                                    Id = c.Id,
                                                    Name = c.Name
                                                });
            return categoriesDto;
        }
    }
}