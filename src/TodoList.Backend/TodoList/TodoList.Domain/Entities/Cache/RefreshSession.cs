namespace TodoList.Domain.Entities.Cache;

public class RefreshSession : CacheEntity
{
    public Guid UserId { get; set; }
    
    public string Fingerprint { get; set; }
    
    public string RefreshToken { get; set; }

    public static string GetCacheKey(Guid userId, string fingerprint)
        => $"{userId}:{fingerprint}";
}