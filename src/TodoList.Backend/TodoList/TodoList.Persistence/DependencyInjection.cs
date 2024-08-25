using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TodoList.Application.Configurations;
using TodoList.Application.Interfaces;

namespace TodoList.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services)
    {
        var scope = services.BuildServiceProvider().CreateScope();

        var databaseConfiguration = scope.ServiceProvider.GetRequiredService<DatabaseConfiguration>();

        services.AddDbContext<ApplicationDbContext>(options =>
        {
            var filledConnectionString = string.Format(databaseConfiguration.ConnectionStringPattern,
                databaseConfiguration.Username, databaseConfiguration.Password);
            
            options.UseNpgsql(filledConnectionString);
        });

        services.AddScoped<IDbContext>(provider =>
            provider.GetRequiredService<ApplicationDbContext>());
        
        return services;
    }
}