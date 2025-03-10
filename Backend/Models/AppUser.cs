using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace EComm.Models;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}