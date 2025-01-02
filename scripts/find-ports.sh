#!/bin/bash

# Base ports
BASE_API_PORT=54321
BASE_DB_PORT=54322
BASE_STUDIO_PORT=54323
BASE_INBUCKET_PORT=54324
BASE_SMTP_PORT=54325
BASE_POP3_PORT=54326
BASE_ANALYTICS_PORT=54327
BASE_VECTOR_PORT=54328

# Function to check if port is available
check_port() {
    local port=$1
    if ! lsof -i :$port > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to find next available port
find_next_port() {
    local port=$1
    while ! check_port $port; do
        ((port++))
    done
    echo $port
}

# Find available ports
API_PORT=$(find_next_port $BASE_API_PORT)
DB_PORT=$(find_next_port $BASE_DB_PORT)
STUDIO_PORT=$(find_next_port $BASE_STUDIO_PORT)
INBUCKET_PORT=$(find_next_port $BASE_INBUCKET_PORT)
SMTP_PORT=$(find_next_port $BASE_SMTP_PORT)
POP3_PORT=$(find_next_port $BASE_POP3_PORT)
ANALYTICS_PORT=$(find_next_port $BASE_ANALYTICS_PORT)
VECTOR_PORT=$(find_next_port $BASE_VECTOR_PORT)

# Update config.toml
cat > supabase/config.toml << EOL
project_id = "tracktalent"

[api]
port = $API_PORT
schemas = ["public", "storage"]
extra_search_path = ["public", "extensions"]
max_rows = 1000

[db]
port = $DB_PORT
major_version = 15

[studio]
port = $STUDIO_PORT

[inbucket]
port = $INBUCKET_PORT
smtp_port = $SMTP_PORT
pop3_port = $POP3_PORT

[storage]
file_size_limit = "50MiB"

[auth]
site_url = "http://localhost:3000"
additional_redirect_urls = ["https://localhost:3000"]
jwt_expiry = 3600
enable_signup = true

[auth.email]
enable_signup = true
double_confirm_changes = true
enable_confirmations = false

[auth.external.github]
enabled = false
client_id = ""
secret = ""
redirect_uri = ""
url = ""

[analytics]
enabled = false
port = $ANALYTICS_PORT
vector_port = $VECTOR_PORT
gcp_project_id = ""
gcp_project_number = ""
gcp_jwt_path = "supabase/gcloud.json"
EOL

# Update .env file with new ports
cat > .env << EOL
# Development Environment
VITE_SUPABASE_URL=http://localhost:$API_PORT
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Development Database Configuration
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_PORT=$DB_PORT

# Email Testing Server (Development only)
INBUCKET_SMTP_PORT=$SMTP_PORT
INBUCKET_POP3_PORT=$POP3_PORT
INBUCKET_WEB_PORT=$INBUCKET_PORT

# Studio Configuration (Development only)
STUDIO_PORT=$STUDIO_PORT
EOL

echo "Updated ports:"
echo "API: $API_PORT"
echo "DB: $DB_PORT"
echo "Studio: $STUDIO_PORT"
echo "Inbucket: $INBUCKET_PORT"
echo "SMTP: $SMTP_PORT"
echo "POP3: $POP3_PORT"
echo "Analytics: $ANALYTICS_PORT"
echo "Vector: $VECTOR_PORT"
