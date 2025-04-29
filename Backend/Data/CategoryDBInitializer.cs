
using EComm.Models;

namespace EComm.Data;

public static class CategoryDbInitializer
{
    public static void Initialize(ApplicationDbContext dbContext)
    {
        if(dbContext.Categories.Any()) return;

        List<Category> categories = new()
        {
            new()
            {
                Name = "Electronics",
                
            },
            new()
            {
             
                Name = "Jewelery",
                
            },
             new()
            {
             
                Name = "Men's Clothing",
                
            }, new()
            {
             
                Name = "Women's Clothing",
                
            },
             new()
            {
             
                Name = "Home Appliance",
                
            },
             new()
            {
             
                Name = "Books",
            },
             new()
            {
             
                Name = "Toys",
            },
             new()
            {
             
                Name = "Sports Equipment",
            },
             new()
            {
                
                Name = "Automotive",   
            },
             new()
            {
                
                Name = "Health and Beauty",
            },
             new()
            {
                
                Name = "Groceries",
            }, 
            new()
            {
                
                Name = "Furniture",
            },
             new()
            {
                
                Name = "Pet Supplies",
            },
        };
        dbContext.AddRange(categories);
        dbContext.SaveChanges();
    }
}