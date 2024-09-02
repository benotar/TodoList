using TodoList.Application.Common;

namespace TodoList.Application.Interfaces.Services;

public interface IRefreshSessionService
{
    Task<Result<None>> CreateOrUpdateAsync(Guid userId, string fingerprint, string refreshToken);
    
    Task<Result<None>> DeleteAsync(Guid userId, string fingerprint);

    Task<Result<bool>> SessionKeyExistsAsync(Guid userId, string fingerprint);
}