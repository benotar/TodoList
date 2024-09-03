using Microsoft.EntityFrameworkCore;
using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;

namespace TodoList.Application.Services;

public class UserService : IUserService
{
    private readonly IDbContext _dbContext;

    private readonly IEncryptionProvider _hmacSha256Provider;

    public UserService(IDbContext dbContext, IEncryptionProvider hmacSha256Provider)
    {
        _dbContext = dbContext;

        _hmacSha256Provider = hmacSha256Provider;
    }

    public async Task<Result<User>> CreateAsync(string username, string password, string name)
    {
        // Check if the user already exists in database
        var existingUser =
            await _dbContext.Users.FirstOrDefaultAsync(user => user.Username.Equals(username));

        if (existingUser is not null)
        {
            return Result<User>.Error(ErrorCode.UsernameAlreadyExists);
        }

        // Convert request password to salt and hash
        var passwordSaltAndHash = await _hmacSha256Provider.HashPasswordAsync(password);

        // Create new user
        var newUser = new User
        {
            Username = username,
            PasswordSalt = passwordSaltAndHash.Salt,
            PasswordHash = passwordSaltAndHash.Hash,
            Name = name
        };

        // Add new user to database
        await _dbContext.Users.AddAsync(newUser);

        try
        {
            // Try save changes
            await _dbContext.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            // If the user is not stored in the database
            return Result<User>.Error(ErrorCode.UserNotSavedToDatabase);
        }

        // Return result
        return !newUser.Id.Equals(Guid.Empty)
            ? Result<User>.Success(newUser)
            : Result<User>.Error(ErrorCode.UserNotSavedToDatabase);
    }
}