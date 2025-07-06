using Microsoft.AspNetCore.Identity;

namespace EComm.Data;

public static class RolesDbInitializer
{
    public static void Initialize(ApplicationDbContext dbContext)
    {
        if (dbContext.Roles.Any())
            return;

        List<IdentityRole> roles = new()
        {
            new() { Name = "Admin", NormalizedName = "ADMIN" },
            new() { Name = "Customer", NormalizedName = "CUSTOMER" },
        };
        dbContext.AddRange(roles);
        dbContext.SaveChanges();
    }
}
