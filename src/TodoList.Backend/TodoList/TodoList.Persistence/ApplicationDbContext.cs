using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces.Persistence;
using TodoList.Domain.Entities.Database;

namespace TodoList.Persistence;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options), IDbContext
{
    public DbSet<User> Users { get; set; }
}