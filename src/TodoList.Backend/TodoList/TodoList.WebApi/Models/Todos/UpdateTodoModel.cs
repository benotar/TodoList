using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Todos;

public class UpdateTodoModel
{
    [Required][StringLength(35, MinimumLength = 3)]
    public string Title { get; set; }
    public string? Description { get; set; }
}