using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using TodoList.Application.Common;
using TodoList.Application.Common.Converters;
using TodoList.Application.Configurations;
using TodoList.Application.Extensions;
using TodoList.Domain.Enums;
using TodoList.WebApi.Infrastructure;

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

    public static IServiceCollection AddControllersWithConfiguredApiBehavior(this IServiceCollection services,
        IConfiguration configuration)
    {
        services
            .AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new ServerResponseStringEnumConverter<ErrorCode>());
                options.JsonSerializerOptions.Converters.Add(new ServerResponseStringEnumConverter<Permission>());
            })
            .ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.GetErrors();

                    var details = new CustomValidationProblemDetails
                    {
                        Type = "https://httpstatuses.com/422",
                        Title = "Validation Error",
                        Detail = "One or more validation errors occurred",
                        Instance = context.HttpContext.Request.Path,
                        Errors = errors
                    };

                    var result = new UnprocessableEntityObjectResult(
                        new Result<CustomValidationProblemDetails>
                        {
                            ErrorCode = ErrorCode.InvalidModel, 
                            Data = details
                        });

                    result.ContentTypes.Add("application/json");

                    return result;
                };
            });

        return services;
    }

    public static IServiceCollection AddConfiguredCors(this IServiceCollection services, CorsConfiguration corsConfig)
    {
        services.AddCors(options =>
        {
            options.AddPolicy(corsConfig.PolicyName, policy =>
            {
                policy
                    .WithOrigins(corsConfig.AllowedOrigins.ToArray())
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            });
        });

        return services;
    }

    public static IServiceCollection AddExceptionHandlerWithProblemDetails(this IServiceCollection services)
    {
        services.AddExceptionHandler<GlobalExceptionHandler>();

        services.AddProblemDetails();

        return services;
    }
}