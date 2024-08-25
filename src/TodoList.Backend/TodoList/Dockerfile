FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_URLS=http://+:80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TodoList.Domain/TodoList.Domain.csproj", "TodoList.Domain/TodoList.Domain.csproj"]
COPY ["TodoList.Application/TodoList.Application.csproj", "TodoList.Application/TodoList.Application.csproj"]
COPY ["TodoList.Persistence/TodoList.Persistence.csproj", "TodoList.Persistence/TodoList.Persistence.csproj"]
COPY ["TodoList.WebApi/TodoList.WebApi.csproj", "TodoList.WebApi/TodoList.WebApi.csproj"]
RUN dotnet restore "TodoList.WebApi/TodoList.WebApi.csproj"
COPY . ./
WORKDIR "/src/TodoList.WebApi"
RUN dotnet build "TodoList.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "TodoList.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoList.WebApi.dll"]
