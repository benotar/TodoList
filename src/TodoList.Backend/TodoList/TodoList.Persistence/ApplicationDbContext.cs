using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces;
using TodoList.Domain.Entities;

namespace TodoList.Persistence;

public class ApplicationDbContext(DbContextOptions options) : DbContext(options), IDbContext
{
    public DbSet<User> Users { get; set; }
}