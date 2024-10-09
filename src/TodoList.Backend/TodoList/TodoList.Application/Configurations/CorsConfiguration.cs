namespace TodoList.Application.Configurations;

public class CorsConfiguration
{
    public static readonly string ConfigurationKey = "Cors";

    public string PolicyName { get; set; }

    public List<string> AllowedOrigins { get; set; } = [];
}