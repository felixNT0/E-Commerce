using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Data;
using EComm.Models;
using EComm.Models.Exceptions;

namespace EComm.Services
{
    public class ImageService : IImageService
    {
        private readonly IWebHostEnvironment _env;
        private readonly ApplicationDbContext _dbContent;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ImageService(IWebHostEnvironment env, ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _env = env;
            _dbContent = dbContext;
        }

        public async Task<Image> CreateImageAsync(IFormFile image)
        {
            
            var request = _httpContextAccessor.HttpContext.Request;
            var fileExtension = Path.GetExtension(image.FileName).ToLower();
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            if (!allowedExtensions.Contains(fileExtension))
                throw new ImageProcessingException($"The accepted file formats are {string.Join("; ", allowedExtensions.Select(e => e))}");
            var imageName = "product" + "_" + Guid.NewGuid() + fileExtension;
            var imagePath = Path.Combine("images", imageName);
            
            if(!Directory.Exists(Path.Combine(_env.ContentRootPath, "images")))
            {
                Directory.CreateDirectory(Path.Combine(_env.ContentRootPath, "images"));
            }
            using var stream = new FileStream(imagePath, FileMode.Create);
            await image.CopyToAsync(stream);
            var imageEntity = new Image 
                    { Name = imageName,
                      FilePath = imagePath, 
                      FileType = image.ContentType, 
                      CreatedAt = DateTime.Now, 
                      Url = $"img{Path.DirectorySeparatorChar}{imageName}"
                    };
            await _dbContent.Images.AddAsync(imageEntity);
            return imageEntity;
        }

    }
}