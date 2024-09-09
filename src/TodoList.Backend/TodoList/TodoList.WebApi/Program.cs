using TodoList.Application;
using TodoList.Domain.Enums;
using TodoList.Application.Common.Converters;
using TodoList.Persistence;
using TodoList.WebApi;
using TodoList.WebApi.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new SnakeCaseStringEnumConverter<ErrorCode>());
    options.JsonSerializerOptions.Converters.Add(new SnakeCaseStringEnumConverter<WarningCode>());
});

builder.AddCustomConfiguration();

builder.Services.AddApplication()
    .AddPersistence(builder.Configuration)
    .AddAuth(builder.Configuration)
    .AddRedis(builder.Configuration);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://localhost:5000", "http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCustomExceptionHandler();

app.UseCors("AllowAll");

app.UseTransferAccessTokenInHeader();

app.UseAuthentication();
app.UseAuthorization();

app.UseStatusCodeModifier();

app.MapControllers();

app.MapGet("/", () => $"Welcome to the Home Page TodoList API!\nUTC Time: {DateTime.UtcNow}");

app.Run();