using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Authentication;

public class LoginRequestModel
{
    [Required] 
    [MinLength(3, ErrorMessage = $"{nameof(UserName)} is too short.")]
    public string UserName { get; set; }
    
    [Required]
    public string Password { get; set; }
    
    [Required] 
    public string Fingerprint { get; set; }
}