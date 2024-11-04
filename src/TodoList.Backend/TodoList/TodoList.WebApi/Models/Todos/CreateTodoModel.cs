using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Todos;

public class CreateTodoModel
{
    [Required]
    [MinLength(3, ErrorMessage = "Title is too short")]
    public string Title { get; set; }
    public string Description { get; set; }
}