using System.ComponentModel.DataAnnotations;
using TodoList.WebApi.Models.Authentication.Validation;

namespace TodoList.WebApi.Models.Authentication;

public class RegisterRequestModel
{
    [Required] [StringLength(20, MinimumLength = 3)]
    public string Username { get; set; }

    [Required] [PasswordValidation]
    public string Password { get; set; }

    [Required] [StringLength(50)]
    public string Name { get; set; }
}