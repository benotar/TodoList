using System.ComponentModel.DataAnnotations;
using TodoList.WebApi.Infrastructure.Validation;

namespace TodoList.WebApi.Models.Authentication;

public class RegisterRequestModel
{
    [Required] 
    [MinLength(3, ErrorMessage = "Username is too short.")]
    public string Username { get; set; }

    [Required] 
    [PasswordValidation]
    public string Password { get; set; }

    [Required] 
    [MinLength(3, ErrorMessage = "Name is too short.")]
    [RegularExpression(@"^[a-zA-Z\s-]+$", ErrorMessage = "The name can only contain letters, spaces, or hyphens.")]
    public string Name { get; set; }
}