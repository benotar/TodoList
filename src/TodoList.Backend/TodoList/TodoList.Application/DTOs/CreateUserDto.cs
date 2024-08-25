namespace TodoList.Application.DTOs;

public class CreateUserDto
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string? Name { get; set; }
}