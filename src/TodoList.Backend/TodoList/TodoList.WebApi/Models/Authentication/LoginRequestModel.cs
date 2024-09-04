using System.ComponentModel.DataAnnotations;

namespace TodoList.WebApi.Models.Authentication;

public class LoginRequestModel
{
    [Required] public string Username { get; set; }
    [Required] public string Password { get; set; }
    [Required] public string Fingerprint { get; set; }
}