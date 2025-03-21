using EComm.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EComm.Data;

public class ApplicationDbContext : IdentityDbContext<AppUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }

    public DbSet<Product> Products {get; set;}
    public DbSet<Image> Images { get; set; }  

    public DbSet<Category> Categories { get; set; }

    public DbSet<Favourite> Favourites { get; set; }

    public DbSet<CartItem> CartItems { get; set; }

    public DbSet<Cart> Carts { get; set; }
}