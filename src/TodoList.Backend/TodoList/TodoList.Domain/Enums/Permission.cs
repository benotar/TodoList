namespace TodoList.Domain.Enums;

public enum Permission
{
    // SuperAdmin - read, update, delete users, read/delete all todos
    Advanced,
    
    // Basic user permission
    Basic
}