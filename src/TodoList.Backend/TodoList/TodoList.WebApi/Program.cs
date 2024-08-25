using Microsoft.EntityFrameworkCore;
using TodoList.Application.Interfaces.Providers;
using TodoList.Application.Interfaces.Services;
using TodoList.Application.Providers;
using TodoList.Application.Services;
using TodoList.Persistence;
using TodoList.WebApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.AddCustomConfiguration();

builder.Services.AddPersistence();

// TODO
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IEncryptionProvider, HmacSha256Provider>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => $"Welcome to the Home Page TodoList API!\nUTC Time: {DateTime.UtcNow}");

app.Run();