using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Caching.Distributed;
using TodoList.Application.Common;
using TodoList.Application.Configurations;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Cache;
using TodoList.Domain.Enums;

namespace TodoList.Application.Services;

public class RefreshTokenSessionService : IRefreshTokenSessionService
{
    private readonly IDistributedCache _redis;

    private readonly RefreshTokenSessionConfiguration _refreshTokenSessionConfiguration;

    private readonly IDateTimeProvider _dateTimeProvider;
    
    public RefreshTokenSessionService(IDistributedCache redis, RefreshTokenSessionConfiguration refreshTokenSessionConfiguration, IDateTimeProvider dateTimeProvider)
    {
        _redis = redis;
        
        _refreshTokenSessionConfiguration = refreshTokenSessionConfiguration;
        
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
            ExpiryAt = _dateTimeProvider.UtcNow.AddDays(_refreshTokenSessionConfiguration.ExpirationDays)
        };

        var redisValue = JsonSerializer.Serialize(entity);

        await _redis.SetStringAsync(redisKey, redisValue,
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(_refreshTokenSessionConfiguration.ExpirationDays)
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
        
        return data is not null
            ? Result<bool>.Success()
            : Result<bool>.Error(ErrorCode.SessionNotFound);

        //return Result<bool>.Success(data is not null);
    }
}