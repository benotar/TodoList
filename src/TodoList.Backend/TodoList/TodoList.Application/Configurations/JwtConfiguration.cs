namespace TodoList.Application.Configurations;

public class JwtConfiguration
{
    public static readonly string ConfigurationKey = "JWT";

    public string SecretKey { get; set; }

    public string Issuer { get; set; }
    
    public string Audience { get; set; }
    
    public int AccessExpirationMinutes { get; set; }
}