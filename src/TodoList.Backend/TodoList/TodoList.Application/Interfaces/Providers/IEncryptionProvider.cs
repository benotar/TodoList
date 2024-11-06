using TodoList.Application.Common;
using TodoList.Application.DTOs;

namespace TodoList.Application.Interfaces.Providers;

public interface IEncryptionProvider
{
    Task<SaltAndHash> HashPasswordAsync(string password);
    SaltAndHash HashPassword(string password);

    Task<bool> VerifyPasswordHash(string password, SaltAndHash saltAndHash);
}