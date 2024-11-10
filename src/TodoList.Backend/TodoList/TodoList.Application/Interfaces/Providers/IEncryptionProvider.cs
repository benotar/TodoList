using TodoList.Application.Common;

namespace TodoList.Application.Interfaces.Providers;

public interface IEncryptionProvider
{
    Task<SaltAndHash> HashPasswordAsync(string password);
    SaltAndHash HashPassword(string password);
    Task<bool> VerifyPasswordHash(string password, SaltAndHash saltAndHash);
}