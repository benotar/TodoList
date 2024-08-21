using Microsoft.EntityFrameworkCore;
using TodoList.Domain.Entities;

namespace TodoList.Persistence;

public class ApiDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }
}