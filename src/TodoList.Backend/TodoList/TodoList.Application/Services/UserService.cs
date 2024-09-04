using System.Collections;
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
        // Check if the user with username already exists in database

        var isUserWithUsernameExist = await _dbContext.Users.AnyAsync(us => us.Username.Equals(username));

        if (isUserWithUsernameExist)
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

    public async Task<Result<User>> GetExistingUser(string username, string password)
    {
        var existingUser =
            await _dbContext.Users.FirstOrDefaultAsync(us => us.Username.Equals(username));

        if (existingUser is null)
        {
            return Result<User>.Error(ErrorCode.UserNotFound);
        }

        var existingUserPasswordSaltAndHash = new SaltAndHash(existingUser.PasswordSalt, existingUser.PasswordHash);

        return await _hmacSha256Provider.VerifyPasswordHash(password, existingUserPasswordSaltAndHash)
            ? Result<User>.Success(existingUser)
            : Result<User>.Error(ErrorCode.AuthenticationFailed);
    }


    // For development testing
    public async Task<Result<IEnumerable<User>>> GetUsersAsync()
    {
        var users = await _dbContext.Users.ToListAsync();

        return users.Count is 0
            ? Result<IEnumerable<User>>.Error(ErrorCode.UsersTableIsEmpty)
            : Result<IEnumerable<User>>.Success(users);
    }
}