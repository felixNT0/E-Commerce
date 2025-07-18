using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace EComm.App.Models;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public Favourite? Favourites { get; set; }

    public Cart? Cart { get; set; }

    public List<Order?> Orders { get; set; } = [];

    public List<Notification?> Notifications { get; set; } = [];
}
