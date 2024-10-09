using Serilog;
using TodoList.Application;
using TodoList.Domain.Enums;
using TodoList.Application.Common.Converters;
using TodoList.Application.Configurations;
using TodoList.Persistence;
using TodoList.WebApi;
using TodoList.WebApi.Middleware;


AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

Log.Information("Starting web application");

var corsConfig = new CorsConfiguration();

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.Bind(CorsConfiguration.ConfigurationKey, corsConfig);

// Remove another logging providers
builder.Logging.ClearProviders();

builder.Services.AddSerilog();

Log.Information($"Starting server with '{builder.Environment.EnvironmentName}' environment...");

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new SnakeCaseStringEnumConverter<ErrorCode>());
});

builder.AddCustomConfiguration();

builder.Services.AddApplication()
    .AddPersistence(builder.Configuration)
    .AddAuth(builder.Configuration)
    .AddRedis(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy(corsConfig.PolicyName, policy =>
    {
        policy
            .WithOrigins(corsConfig.AllowedOrigins.ToArray())
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

await using var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsConfig.PolicyName);

app.UseCustomExceptionHandler();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => $"Welcome to the Home Page TodoList API!\nUTC Time: {DateTime.UtcNow}");

Log.Information($"Server started with '{builder.Environment.EnvironmentName}' environment!");

await app.RunAsync();