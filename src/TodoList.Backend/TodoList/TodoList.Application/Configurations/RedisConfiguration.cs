namespace TodoList.Application.Configurations;

public class RedisConfiguration
{
    public static readonly string ConfigurationKey = "Redis";

    public string ConnectionString { get; set; }
}