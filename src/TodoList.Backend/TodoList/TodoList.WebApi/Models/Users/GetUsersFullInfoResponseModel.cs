using TodoList.Domain.Entities.Database;
using TodoList.Domain.Enums;
using TodoList.WebApi.Models.Todos;

namespace TodoList.WebApi.Models.Users;

public class GetUsersFullInfoResponseModel
{
    public Guid UserId { get; set; }
    public string UserName { get; set; }
    public byte[] PasswordSalt { get; set; }
    public byte[] PasswordHash { get; set; }
    public string Name { get; set; }
    public Permission Permission { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public IEnumerable<TodoWithoutUserModel> Todos { get; set; } = new List<TodoWithoutUserModel>();
}