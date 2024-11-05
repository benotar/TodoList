using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TodoList.Application.Configurations;
using TodoList.Application.Interfaces.Persistence;

namespace TodoList.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var databaseConfiguration = new DatabaseConfiguration();

        configuration.Bind(DatabaseConfiguration.ConfigurationKey, databaseConfiguration);
        
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            var filledConnectionString = string.Format(databaseConfiguration.ConnectionStringPattern,
                databaseConfiguration.Username, databaseConfiguration.Password);
            
            options.UseNpgsql(filledConnectionString);

            // If there is no EF cache, then it improves EF performance.
            // To work with queries that change the state of an entity - use .AsTracking().
            options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        });

        services.AddScoped<IDbContext>(provider =>
            provider.GetRequiredService<ApplicationDbContext>());
        
        return services;
    }
}