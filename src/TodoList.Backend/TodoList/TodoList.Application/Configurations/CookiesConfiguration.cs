namespace TodoList.Application.Configurations;

public class CookiesConfiguration
{
    public static readonly string ConfigurationKey = "Cookies";
    
    public string AccessTokenCookieKey { get; set; }
    
    public string RefreshTokenCookieKey { get; set; }
    
    public string FingerprintCookieKey { get; set; }
}