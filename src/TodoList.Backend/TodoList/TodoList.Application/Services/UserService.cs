using Microsoft.EntityFrameworkCore;
using TodoList.Application.Common;
using TodoList.Application.DTOs;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Providers.Persistence;
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

    public async Task<Result<User>> CreateAsync(CreateUserDto createUserDto)
    {
        // Check if the user already exists in database
        var existingUser =
            await _dbContext.Users.FirstOrDefaultAsync(user => user.Username.Equals(createUserDto.UserName));

        if (existingUser is not null)
        {
            return Result<User>.Error(ErrorCode.UsernameAlreadyExists);
        }
        
        // Convert request password to salt and hash
        var passwordSaltAndHash = await _hmacSha256Provider.HashPasswordAsync(createUserDto.Password);

        // Create new user
        var newUser = new User
        {
            Username = createUserDto.UserName,
            PasswordSalt = passwordSaltAndHash.Salt,
            PasswordHash = passwordSaltAndHash.Hash,
            Name = createUserDto.Name
        };
        
        // Check if the userEntry state is correct
        if ((await _dbContext.Users.AddAsync(newUser)).State != EntityState.Added)
        {
            return Result<User>.Error(ErrorCode.UserNotAddedToDatabase);
        }
        
        await _dbContext.SaveChangesAsync();
        
        // Check if the user was successfully saved
        var savedUser = await _dbContext.Users.FindAsync(newUser.Id);

        return savedUser is null 
            ? Result<User>.Error(ErrorCode.UserNotSavedToDatabase) 
            : Result<User>.Success(savedUser);
    }
}