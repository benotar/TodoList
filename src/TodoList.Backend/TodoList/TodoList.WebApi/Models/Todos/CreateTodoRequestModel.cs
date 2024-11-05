using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Todos;

public class CreateTodoRequestModel
{
    [Required]
    [MinLength(3, ErrorMessage = "Title is too short")]
    public string Title { get; set; }
    
    [Required]
    [MinLength(3, ErrorMessage = "Description is too short")]
    public string Description { get; set; }
}