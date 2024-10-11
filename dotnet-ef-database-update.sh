#!/bin/bash

# Generate two random GUIDs and concatenate them to get a 64-character key
RAND_KEY1=$(uuidgen | tr -d '-')
RAND_KEY2=$(uuidgen | tr -d '-')

# Concatenate the two keys to form a 64-character JWT secret key
RAND_JWT_KEY="${RAND_KEY1}${RAND_KEY2}"

# Save the secret key and creation date to a file
echo "JWT_SECRET=${RAND_JWT_KEY}" >> Jwt-Secret-Keys.txt
echo "Created at: $(date)" >> Jwt-Secret-Keys.txt
echo "" >> Jwt-Secret-Keys.txt

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running!"
    read -p "Press Enter to exit..."
    exit 1
fi

# Navigate to the Backend directory
cd ./src/TodoList.Backend || exit

# Build Docker container with the generated JWT secret
docker-compose build --build-arg POSTGRES_DB_USERNAME=admin --build-arg POSTGRES_DB_PASSWORD=admin --build-arg JWT_SECRET="${RAND_JWT_KEY}"

# Start the Postgres container in detached mode (-d) without blocking the terminal
docker-compose up postgres -d

# Wait for user to press Enter before continuing
read -p "Postgres container started. Press Enter to continue..."

# Navigate to the WebApi directory and restore .NET dependencies
cd ./TodoList/TodoList.WebApi || exit
dotnet restore

# Navigate to the Persistence directory and apply EF migrations
cd ../TodoList.Persistence || exit
dotnet ef database update -s ../TodoList.WebApi/TodoList.WebApi.csproj

# Wait for user to press Enter before continuing
read -p "Migrations applied. Press Enter to continue..."

# Go back to the root directory and shut down Docker
cd ../../ || exit
docker-compose down

# Wait for user to press Enter before closing
read -p "Docker containers shut down. Press Enter to exit..."
