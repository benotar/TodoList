@echo off

setlocal enabledelayedexpansion

REM Generate two random GUIDs and concatenate them to get a 64-character key
for /f %%i in ('powershell -Command "[System.Guid]::NewGuid().ToString('N')"') do set "RAND_KEY1=%%i"
for /f %%i in ('powershell -Command "[System.Guid]::NewGuid().ToString('N')"') do set "RAND_KEY2=%%i"

REM Concatenate the two keys to form a 64-character JWT secret key
set "RAND_JWT_KEY=!RAND_KEY1!!RAND_KEY2!"

REM Save the secret key and creation date to a file
echo JWT_SECRET=!RAND_JWT_KEY! >> Jwt-Secret-Keys.txt
echo Created at: %DATE% %TIME% >> Jwt-Secret-Keys.txt
echo. >> Jwt-Secret-Keys.txt

REM Check if Docker is running
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker is not running!
	pause
    exit /b 1
)

REM Navigate to the Backend directory
cd .\src\TodoList.Backend

REM Build Docker container with the generated JWT secret
docker-compose build --build-arg POSTGRES_DB_USERNAME=admin --build-arg POSTGRES_DB_PASSWORD=admin --build-arg JWT_SECRET=!RAND_JWT_KEY!

pause