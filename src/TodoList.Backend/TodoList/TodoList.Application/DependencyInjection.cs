using Microsoft.Extensions.DependencyInjection;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Application.Providers;
using TodoList.Application.Services;

namespace TodoList.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddTransient<IUserService, UserService>();
        
        services.AddSingleton<IEncryptionProvider, HmacSha256Provider>();
        services.AddSingleton<IJwtProvider, JwtProvider>();
        
        return services;
    }
}