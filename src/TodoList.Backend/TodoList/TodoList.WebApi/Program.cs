using Serilog;
using TodoList.Application;
using TodoList.Application.Configurations;
using TodoList.Persistence;
using TodoList.WebApi;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);

var corsConfig = new CorsConfiguration();

Log.Information("Starting a web application.");

var builder = WebApplication.CreateBuilder(args);
{
    builder.Configuration.Bind(CorsConfiguration.ConfigurationKey, corsConfig);

    builder.Host.ConfigureSerilog();
    
    builder.AddCustomConfiguration();

    builder.Services.AddApplication()
        .AddPersistence(builder.Configuration)
        .AddAuth(builder.Configuration)
        .AddRedis(builder.Configuration);

    builder.Services.AddControllersWithConfiguredApiBehavior(builder.Configuration);
    
    builder.Services.AddExceptionHandlerWithProblemDetails();

    builder.Services.AddConfiguredCors(corsConfig);

    builder.Services.AddSwagger();
}

var app = builder.Build();
{
    // CORS
    app.UseCors(corsConfig.PolicyName);
    
    // Auth
    app.UseAuthentication();
    app.UseAuthorization();

    // Logger
    app.UseSerilogRequestLogging();

    // Exceptions handling
    app.UseExceptionHandler();
    
    // Swagger
    app.UseSwagger();
    app.UseSwaggerUI(config =>
    {
        config.RoutePrefix = string.Empty;

        config.SwaggerEndpoint("swagger/v1/swagger.json", "TodoList API");
    });
    
    // Controller routing
    app.MapControllers();

    // Standard route for the home page
    app.MapGet("/", () => $"Welcome to the Home Page TodoList API!\nUTC Time: {DateTime.UtcNow}");

    // Server startup login
    Log.Information($"Server started on '{app.Environment.EnvironmentName}' environment.");

    // Launching the program
    app.Run();
}