using Microsoft.AspNetCore.Mvc;
using Serilog;
using TodoList.Application;
using TodoList.Domain.Enums;
using TodoList.Application.Common.Converters;
using TodoList.Application.Configurations;
using TodoList.Persistence;
using TodoList.WebApi;
using TodoList.WebApi.Infrastructure;


AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();

Log.Information("Starting web application");

var corsConfig = new CorsConfiguration();

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Configuration.Bind(CorsConfiguration.ConfigurationKey, corsConfig);

// Remove another logging providers
builder.Logging.ClearProviders();

builder.Services.AddSerilog();

Log.Information($"Starting server with '{builder.Environment.EnvironmentName}' environment...");

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new ServerResponseStringEnumConverter<ErrorCode>());
});

builder.AddCustomConfiguration();

builder.Services.AddApplication()
    .AddPersistence(builder.Configuration)
    .AddAuth(builder.Configuration)
    .AddRedis(builder.Configuration);

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

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

var app = builder.Build();

app.UseCors(corsConfig.PolicyName);

app.UseExceptionHandler();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => $"Welcome to the Home Page TodoList API!\nUTC Time: {DateTime.UtcNow}");

Log.Information($"Server started with '{builder.Environment.EnvironmentName}' environment!");

app.Run();