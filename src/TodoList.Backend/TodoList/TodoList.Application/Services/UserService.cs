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

    private readonly IDateTimeProvider _dateTimeProvider;

    public UserService(IDbContext dbContext, IEncryptionProvider hmacSha256Provider, IDateTimeProvider dateTimeProvider)
    {
        _dbContext = dbContext;

        _hmacSha256Provider = hmacSha256Provider;

        _dateTimeProvider = dateTimeProvider;
    }

    public async Task<Result<IEnumerable<UserWithTodoDto>>> GetUsersFullInfoAsync()
    {
        // Get users and their todos
        var users = await _dbContext.Users
            .Include(user => user.Todos)
            .ToListAsync();

        // Get users and their todos without displaying user information in those todos
        var usersDto = users.Select(user => user.ToUserWithTodoDto()).ToList();

        // Return result
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

    public async Task<Result<None>> UpdateAsync(Guid userId, string userName, string name)
    {
        // Get user
        var existingUser = await _dbContext.Users
            .AsTracking()
            .FirstOrDefaultAsync(user => user.Id == userId);

        // Check if user exists
        if (existingUser is null)
        {
            return ErrorCode.UserNotFound;
        }

        // Check if the provided user information does not match the current one
        if (string.Equals(userName, existingUser.UserName, StringComparison.OrdinalIgnoreCase)
            && string.Equals(name, existingUser.Name, StringComparison.OrdinalIgnoreCase))
        {
            return ErrorCode.DataIsTheSame;
        }

        // Update user
        existingUser.UserName = userName;
        existingUser.Name = name;
        existingUser.UpdatedAt = _dateTimeProvider.UtcNow;

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return success result
        return Result<None>.Success();
    }

    public async Task<Result<None>> UpdatePermissionAsync(Guid userId, Permission permission)
    {
        // Get user
        var existingUser = await _dbContext.Users
            .AsTracking()
            .FirstOrDefaultAsync(user => user.Id == userId);

        // Check if user exists
        if (existingUser is null)
        {
            return ErrorCode.UserNotFound;
        }

        // Check if the previously granted permission does not match the current one
        if (permission == existingUser.Permission)
        {
            return ErrorCode.DataIsTheSame;
        }

        // Update permission
        existingUser.Permission = permission;
        existingUser.UpdatedAt = _dateTimeProvider.UtcNow;

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return success result
        return Result<None>.Success();
    }

    public async Task<Result<None>> DeleteByIdAsync(Guid userId)
    {
        // Get user
        var existingUser = await _dbContext.Users
            .FirstOrDefaultAsync(user => user.Id == userId);

        // Check if user exists
        if (existingUser is null)
        {
            return ErrorCode.UserNotFound;
        }

        // Remove user
        _dbContext.Users.Remove(existingUser);

        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return success result
        return Result<None>.Success();
    }

    public async Task<Result<None>> DeleteBasicUsersAsync()
    {
        // Target permission
        const Permission targetPermission = Permission.Basic;
        
        // Get users with the target permission
        var targetUsers = _dbContext.Users.Where(user => user.Permission == targetPermission);
        
        // Check if users with the target permission exist
        if (!await targetUsers.AnyAsync())
        {
            return Result<None>.Success();
        }
       
        // Remove users with the target permission
        _dbContext.Users.RemoveRange(targetUsers);
        
        // Save changes
        await _dbContext.SaveChangesAsync();

        // Return success result
        return Result<None>.Success();
    }

    public async Task<bool> IsUserExistByIdAsync(Guid userId)
    {
        // Check if user by id exists and return result
        return await _dbContext.Users.AnyAsync(user => user.Id == userId);
    }

    private async Task<bool> IsUserExistsByUserNameAsync(string userName)
    {
        // Check if user by userName exists and return result
        return await _dbContext.Users.AnyAsync(user => user.UserName == userName);
    }
}