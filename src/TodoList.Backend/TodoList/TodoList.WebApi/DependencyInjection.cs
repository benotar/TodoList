using Microsoft.Extensions.Options;
using TodoList.Application.Configurations;

namespace TodoList.WebApi;

public static class DependencyInjection
{
    public static void AddCustomConfiguration(this WebApplicationBuilder builder)
    {
        builder.Services.Configure<DatabaseConfiguration>(
            builder.Configuration.GetSection(DatabaseConfiguration.ConfigurationKey));
        builder.Services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<DatabaseConfiguration>>().Value);

        builder.Services.Configure<JwtConfiguration>(
            builder.Configuration.GetSection(JwtConfiguration.ConfigurationKey));
        builder.Services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<JwtConfiguration>>().Value);

        builder.Services.Configure<RefreshTokenSessionConfiguration>(
            builder.Configuration.GetSection(RefreshTokenSessionConfiguration.ConfigurationKey));
        builder.Services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<RefreshTokenSessionConfiguration>>().Value);
        
        builder.Services.Configure<RedisConfiguration>(
            builder.Configuration.GetSection(RedisConfiguration.ConfigurationKey));
        builder.Services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<RedisConfiguration>>().Value);

        builder.Services.Configure<CookiesConfiguration>(
            builder.Configuration.GetSection(CookiesConfiguration.ConfigurationKey));
        builder.Services.AddSingleton(resolver => 
            resolver.GetRequiredService<IOptions<CookiesConfiguration>>().Value);

        builder.Services.Configure<CorsConfiguration>(
            builder.Configuration.GetSection(CorsConfiguration.ConfigurationKey));
        builder.Services.AddSingleton(resolver =>
            resolver.GetRequiredService<IOptions<CorsConfiguration>>().Value);
    }
}