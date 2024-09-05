using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using TodoList.Application.Configurations;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Application.Providers;
using TodoList.Application.Services;

namespace TodoList.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IRefreshTokenSessionService, RefreshTokenSessionService>();
        services.AddScoped<ITodoService, TodoService>();
        
        services.AddSingleton<IDateTimeProvider, DateTimeProvider>();
        services.AddSingleton<IEncryptionProvider, HmacSha256Provider>();
        services.AddSingleton<IJwtProvider, JwtProvider>();
        services.AddSingleton<ICookieProvider, CookieProvider>();
        
        return services;
    }

    public static IServiceCollection AddAuth(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtConfig = new JwtConfiguration();
        
        configuration.Bind(JwtConfiguration.ConfigurationKey, jwtConfig);
        
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtConfig.Issuer,
            ValidAudience = jwtConfig.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.SecretKey))
        };

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = tokenValidationParameters;
            });

        return services;
    }

    public static IServiceCollection AddRedis(this IServiceCollection services, IConfiguration configuration)
    {
        var redisConfig = new RedisConfiguration();

        configuration.Bind(RedisConfiguration.ConfigurationKey, redisConfig);

        services.AddStackExchangeRedisCache(options =>
        {
            options.Configuration = redisConfig.ConnectionString;
        });

        return services;
    }
}