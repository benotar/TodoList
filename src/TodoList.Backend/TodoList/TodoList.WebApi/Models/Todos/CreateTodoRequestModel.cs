using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Todos;

public class CreateTodoRequestModel
{
    [Required]
    [MinLength(3, ErrorMessage = "Title is too short")]
    public string Title { get; set; }
    
    [Required]
    public bool? IsCompleted { get; set; }
}