docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker is not running!
    pause
    exit /b 1
)

cd .\src\TodoList.Backend

docker-compose build --build-arg POSTGRES_DB_USERNAME=admin --build-arg POSTGRES_DB_PASSWORD=admin --build-arg JWT_SECRET=43f958b8b600b55ae51b521fa1585dcb459f7828e739b1de86e19d9e5559ca5667157cd0d4b928ad34bf08083f7ca1bf2f833f4122f2eb8a826dac721dfdd8d4
docker-compose up postgres -d

cd .\TodoList\TodoList.WebApi
dotnet restore

cd ..\TodoList.Persistence
dotnet ef database update -s ..\TodoList.WebApi\TodoList.WebApi.csproj

cd ..\..\
docker-compose down

pause