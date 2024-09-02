using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;
using TodoList.Application.Common;
using TodoList.Application.Configurations;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Cache;

namespace TodoList.Application.Services;

public class RefreshSessionService : IRefreshSessionService
{
    private readonly IDistributedCache _redis;

    private readonly RefreshSessionConfiguration _refreshSessionConfiguration;

    private readonly IDateTimeProvider _dateTimeProvider;
    
    public RefreshSessionService(IDistributedCache redis, RefreshSessionConfiguration refreshSessionConfiguration, IDateTimeProvider dateTimeProvider)
    {
        _redis = redis;
        
        _refreshSessionConfiguration = refreshSessionConfiguration;
        
        _dateTimeProvider = dateTimeProvider;
    }


    public async Task<Result<None>> CreateOrUpdateAsync(Guid userId, string fingerprint, string refreshToken)
    {
        var redisKey = RefreshSession.GetCacheKey(userId, fingerprint);

        var entity = new RefreshSession
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Fingerprint = fingerprint,
            RefreshToken = refreshToken,
            DestroysAt = _dateTimeProvider.UtcNow.AddMinutes(_refreshSessionConfiguration.ExpirationMinutes)
        };

        var redisValue = JsonSerializer.Serialize(entity);

        await _redis.SetStringAsync(redisKey, redisValue,
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(_refreshSessionConfiguration.ExpirationMinutes)
            });

        return Result<None>.Success();
    }

    public async Task<Result<None>> DeleteAsync(Guid userId, string fingerprint)
    {
        var redisKey = RefreshSession.GetCacheKey(userId, fingerprint);

        await _redis.RemoveAsync(redisKey);

        return Result<None>.Success();
    }

    public async Task<Result<bool>> SessionKeyExistsAsync(Guid userId, string fingerprint)
    {
        var redisKey = RefreshSession.GetCacheKey(userId, fingerprint);

        var data = await _redis.GetStringAsync(redisKey);
        
        return Result<bool>.Success(data is not null);
    }
}