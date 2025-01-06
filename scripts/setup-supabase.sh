#!/bin/bash

echo "Setting up Supabase..."

# Stop any running containers
echo "Stopping any running containers..."
supabase stop || true

echo "Cleaning up Docker resources..."
docker rm -f $(docker ps -a -q --filter name=supabase) 2>/dev/null || true
docker volume rm $(docker volume ls -q --filter name=supabase) 2>/dev/null || true

echo "Cleaning up migration files..."
rm -f supabase/migrations/*_remote_schema.sql 2>/dev/null || true

echo "Starting Supabase..."
supabase start

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 15

echo "Resetting database..."
supabase db reset

echo "Setup complete! Auth is now ready to use."
