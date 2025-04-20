#!/bin/bash
set -e

# Monta a string de conexão
DATABASE_URL="postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=${DB_SSL_MODE}"

# Executa as migrations
migrate -path=/home/go/app/migrations -database="$DATABASE_URL" up

# Compila o binário no diretório /home/go/build
CompileDaemon \
  --build="go build -o /home/go/build/app ./cmd/app/main.go" \
  --command="/home/go/build/app" \
  --directory=/home/go/app
