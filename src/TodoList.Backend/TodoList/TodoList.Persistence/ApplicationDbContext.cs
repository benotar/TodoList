using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Application.Interfaces.Providers;
using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;
using TodoList.Persistence.EntityTypeConfigurations;

namespace TodoList.Persistence;

public class ApplicationDbContext(
    DbContextOptions<ApplicationDbContext> options,
    IEncryptionProvider hmacSha256Provider) : DbContext(options), IDbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Todo> Todos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new TodoTypeConfiguration());

        var saltAndHash = hmacSha256Provider.HashPassword("Admin");

        modelBuilder.Entity<User>().HasData(new User
        {
            Id = Guid.NewGuid(),
            UserName = "Admin",
            PasswordSalt = saltAndHash.Salt,
            PasswordHash = saltAndHash.Hash,
            Name = "Admin",
            Permission = Permission.Advanced
        });

        base.OnModelCreating(modelBuilder);
    }
}