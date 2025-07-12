namespace EComm.App.Data;

public static class Extensions
{
    public static void SeedRoles(this IHost host)
    {
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<ApplicationDbContext>();
                RolesDbInitializer.Initialize(context);
            }
        }
    }

    public static void SeedCategories(this IHost host)
    {
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<ApplicationDbContext>();
                CategoryDbInitializer.Initialize(context);
            }
        }
    }
}
