#!/bin/bash

echo "Setting up Supabase with dynamic ports..."

# First, run the find-ports script
./scripts/find-ports.sh

# Stop any running containers
echo "Stopping any running containers..."
supabase stop

# Clean up Docker containers and volumes
echo "Cleaning up Docker resources..."
docker rm -f $(docker ps -a -q --filter name=supabase) 2>/dev/null || true
docker volume rm $(docker volume ls -q --filter name=supabase) 2>/dev/null || true

# Remove any existing migration lock files
echo "Cleaning up migration files..."
rm -f supabase/migrations/.migration-lock

# Reset database first
echo "Resetting database..."
supabase db reset --debug

# Start Supabase after reset
echo "Starting Supabase..."
supabase start

# Get the actual ports from config.toml
API_PORT=$(grep -A 1 '\[api\]' supabase/config.toml | grep 'port' | awk '{print $3}')
STUDIO_PORT=$(grep -A 1 '\[studio\]' supabase/config.toml | grep 'port' | awk '{print $3}')
INBUCKET_PORT=$(grep -A 1 '\[inbucket\]' supabase/config.toml | grep 'port' | awk '{print $3}')

echo "Setup complete! You can now run 'npm run dev'"

# Print useful information
echo ""
echo "Available endpoints:"
echo "  API URL:     http://localhost:${API_PORT}"
echo "  Studio URL:  http://localhost:${STUDIO_PORT}"
echo "  Inbucket:    http://localhost:${INBUCKET_PORT}"
echo ""
echo "Demo accounts:"
echo "  Candidate: candidate@demo.com"
echo "  Employer:  employer@demo.com"
echo "  Partner:   partner@demo.com"
