using Serilog;
using TodoList.Application;
using TodoList.Application.Configurations;
using TodoList.Persistence;
using TodoList.WebApi;

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

Log.Information("Starting web application");

var corsConfig = new CorsConfiguration();

var builder = WebApplication.CreateBuilder(args);
{
    builder.Configuration.Bind(CorsConfiguration.ConfigurationKey, corsConfig);

    // Remove another logging providers
    builder.Logging.ClearProviders();

    builder.Services.AddSerilog();

    Log.Information($"Starting server with '{builder.Environment.EnvironmentName}' environment...");

    builder.Services.AddControllersWithConfiguredApiBehavior(builder.Configuration);

    builder.AddCustomConfiguration();

    builder.Services.AddApplication()
        .AddPersistence(builder.Configuration)
        .AddAuth(builder.Configuration)
        .AddRedis(builder.Configuration);

    builder.Services.AddExceptionHandlerWithProblemDetails();

    builder.Services.AddConfiguredCors(corsConfig);
}

var app = builder.Build();
{
    app.UseCors(corsConfig.PolicyName);

    app.UseExceptionHandler();

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();

    app.MapGet("/", () => $"Welcome to the Home Page TodoList API!\nUTC Time: {DateTime.UtcNow}");

    Log.Information($"Server started with '{builder.Environment.EnvironmentName}' environment!");

    app.Run();
}