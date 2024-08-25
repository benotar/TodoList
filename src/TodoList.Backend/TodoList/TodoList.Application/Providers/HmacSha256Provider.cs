using System.Security.Cryptography;
using System.Text;
using TodoList.Application.Common;
using TodoList.Application.Interfaces.Providers;

namespace TodoList.Application.Providers;

public class HmacSha256Provider : IEncryptionProvider
{
    public async Task<SaltAndHashResult> HashPasswordAsync(string password)
    {
        using var hmac = new HMACSHA256();
        
        var salt = hmac.Key;

        var passwordBytes = Encoding.UTF8.GetBytes(password);

        var hash = await hmac.ComputeHashAsync(new MemoryStream(passwordBytes));

        return new SaltAndHashResult(salt, hash);
    }
}