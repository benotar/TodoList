using TodoList.Application.Common;

namespace TodoList.Application.Interfaces.Providers;

public interface IEncryptionProvider
{
    public Task<SaltAndHashResult> HashPasswordAsync(string password);
}