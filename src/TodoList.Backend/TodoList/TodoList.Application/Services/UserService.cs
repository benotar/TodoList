using Microsoft.EntityFrameworkCore;
using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Services;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;

namespace TodoList.Application.Services;

public class UserService : IUserService
{
    private readonly IDbContext _dbContext;

    private readonly IEncryptionProvider _hmacSha256Provider;

    private readonly IUserQueryProvider _userQueryProvider;

    public UserService(IDbContext dbContext, IEncryptionProvider hmacSha256Provider,
        IUserQueryProvider userQueryProvider)
    {
        _dbContext = dbContext;

        _hmacSha256Provider = hmacSha256Provider;

        _userQueryProvider = userQueryProvider;
    }

    // For development testing
    public async Task<Result<IEnumerable<User>>> GetUsersAsync()
    {
        var users = await _dbContext.Users.AsTracking().ToListAsync();

        return users;
    }

    public async Task<Result<User>> CreateAsync(string username, string password, string name)
    {
        // Check if the user with username already exists in database

        var condition = _userQueryProvider.ByUsername(username);

        var isUserExist = await _userQueryProvider.FindUserByConditionAsync(
            condition, query => query.AnyAsync());

        if (isUserExist)
        {
            return ErrorCode.UsernameAlreadyExists;
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

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return result
        return !newUser.Id.Equals(Guid.Empty) ? newUser : ErrorCode.DataNotSavedToDatabase;
    }

    public async Task<Result<User>> GetExistingUser(string username, string password)
    {
        var condition = _userQueryProvider.ByUsername(username);

        var existingUser = await _userQueryProvider.FindUserByConditionAsync(
            condition, query => query.FirstOrDefaultAsync());

        if (existingUser is null)
        {
            return Result<User>.Error(ErrorCode.UserNotFound);
        }

        var existingUserPasswordSaltAndHash = new SaltAndHash(existingUser.PasswordSalt, existingUser.PasswordHash);

        return await _hmacSha256Provider.VerifyPasswordHash(password, existingUserPasswordSaltAndHash)
            ? existingUser
            : ErrorCode.AuthenticationFailed;
    }

    public async Task<Result<User>> GetUserById(Guid userId)
    {
        var condition = _userQueryProvider.ByUserId(userId);

        var existingUser = await _userQueryProvider.FindUserByConditionAsync(
            condition, query => query.FirstOrDefaultAsync());

        return existingUser is null ? ErrorCode.UserNotFound : existingUser;
    }

    public async Task<bool> IsUserExist(Guid userId)
    {
        return await _dbContext.Users.AnyAsync(user => user.Id == userId);
    }
}