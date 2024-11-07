using TodoList.Domain.Entities.Database;
using TodoList.WebApi.Models.Users;

namespace TodoList.WebApi.Models.Todos;
public class GetFullInfoTodosResponseModel
{
    public Guid TodoId { get; set; }
    public UserWithoutTodoModel User { get; set; }
    public string Title { get; set; }
    public bool? IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}