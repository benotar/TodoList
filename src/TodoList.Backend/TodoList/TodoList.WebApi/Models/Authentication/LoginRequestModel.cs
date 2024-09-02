namespace TodoList.WebApi.Models.Authentication;

public class LoginRequestModel
{
    public string Username { get; set; }

    public string Password { get; set; }

    public string Fingerprint { get; set; }
}