using Microsoft.EntityFrameworkCore;
using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Application.Extensions;
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

    public UserService(IDbContext dbContext, IEncryptionProvider hmacSha256Provider)
    {
        _dbContext = dbContext;

        _hmacSha256Provider = hmacSha256Provider;
    }
    public async Task<Result<IEnumerable<UserWithTodoDto>>> GetUsersFullInfoAsync()
    {
        var users = await _dbContext.Users
            .Include(user => user.Todos)
            .ToListAsync();

        var usersDto = users.Select(user => user.ToUserWithTodoDto()).ToList();
        
        return usersDto;
    }

    public async Task<Result<None>> CreateAsync(string userName, string password, string name, Permission permission)
    {
        // Check if userName is null or empty
        if (string.IsNullOrEmpty(userName))
        {
            return ErrorCode.UsernameIsRequired;
        }

        // Check if password is null or empty
        if (string.IsNullOrEmpty(password))
        {
            return ErrorCode.PasswordIsRequired;
        }

        // Check if userName already exists
        if (await IsUserExistsByUserNameAsync(userName))
        {
            return ErrorCode.UsernameAlreadyExists;
        }

        // Convert request password to salt and hash
        var passwordSaltAndHash = await _hmacSha256Provider.HashPasswordAsync(password);

        // Create new user
        var newUser = new User
        {
            UserName = userName,
            PasswordSalt = passwordSaltAndHash.Salt,
            PasswordHash = passwordSaltAndHash.Hash,
            Name = name,
            Permission = permission
        };

        // Add new user to database
        await _dbContext.Users.AddAsync(newUser);

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return result
        return Result<None>.Success();
    }

    public async Task<Result<UserDto>> GetByUserNameAndCheckPasswordAsync(string userName, string password)
    {
        // Ger user
        var existingUser = await _dbContext.Users.FirstOrDefaultAsync(user => user.UserName == userName);

        // Check if user exists
        if (existingUser is null)
        {
            return ErrorCode.UserNotFound;
        }

        // Verify password and return result
        var existingUserPasswordSaltAndHash = new SaltAndHash(existingUser.PasswordSalt, existingUser.PasswordHash);

        return await _hmacSha256Provider.VerifyPasswordHash(password, existingUserPasswordSaltAndHash)
            ? existingUser.ToDto()
            : ErrorCode.AuthenticationFailed;
    }

    // public async Task<Result<UserDto>> GetByIdAsync(Guid userId)
    // {
    //     // Ger user
    //     var existingUser = await _dbContext.Users.Where(user => user.Id == userId)
    //         .Select(user => user.ToDto())
    //         .FirstOrDefaultAsync();
    //
    //     // Check if user exists
    //     if (existingUser is null)
    //     {
    //         return ErrorCode.UserNotFound;
    //     }
    //
    //     // Return result
    //     return existingUser;
    // }

    public async Task<bool> IsUserExistByIdAsync(Guid userId)
    {
        return await _dbContext.Users.AnyAsync(user => user.Id == userId);
    }

    private async Task<bool> IsUserExistsByUserNameAsync(string userName)
    {
        return await _dbContext.Users.AnyAsync(user => user.UserName == userName);
    }
}