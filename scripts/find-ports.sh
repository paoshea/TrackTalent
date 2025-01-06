#!/bin/bash

# Function to check if a port is available
check_port() {
    local port=$1
    if ! lsof -i :$port > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Function to find next available port starting from a base port
find_next_port() {
    local base_port=$1
    local port=$base_port
    
    while ! check_port $port; do
        ((port++))
    done
    
    echo $port
}

# Find available ports for each service
API_PORT=$(find_next_port 54321)
DB_PORT=$(find_next_port $((API_PORT + 1)))
STUDIO_PORT=$(find_next_port $((DB_PORT + 1)))
INBUCKET_PORT=$(find_next_port $((STUDIO_PORT + 1)))
SMTP_PORT=$(find_next_port $((INBUCKET_PORT + 1)))
POP3_PORT=$(find_next_port $((SMTP_PORT + 1)))
ANALYTICS_PORT=$(find_next_port $((POP3_PORT + 1)))
VECTOR_PORT=$(find_next_port $((ANALYTICS_PORT + 1)))

echo "Updated ports:"
echo "API: $API_PORT"
echo "DB: $DB_PORT"
echo "Studio: $STUDIO_PORT"
echo "Inbucket: $INBUCKET_PORT"
echo "SMTP: $SMTP_PORT"
echo "POP3: $POP3_PORT"
echo "Analytics: $ANALYTICS_PORT"
echo "Vector: $VECTOR_PORT"

# Update config.toml with new ports
cat > supabase/config.toml << EOL
# A string used to distinguish different Supabase projects on the same host. Defaults to the working
# directory name when running [supabase init].
project_id = "tracktalent"

[api]
# Port to use for the API URL.
port = $API_PORT
# Schemas to expose in your API. Tables, views and stored procedures in this schema will get API
# endpoints. public and storage are always included.
schemas = ["public", "storage", "auth"]
# Extra schemas to add to the search_path of every request. public is always included.
extra_search_path = ["extensions"]
# The maximum number of rows returns from a view, table, or stored procedure. Limits payload size
# for accidental or malicious requests.
max_rows = 1000

[db]
# Port to use for the local database URL.
port = $DB_PORT
# The database major version to use. This has to be the same as your remote database's. Run \`SHOW
# server_version;` on the remote database to check.
major_version = 15

[studio]
# Port to use for Supabase Studio.
port = $STUDIO_PORT

# Email testing server. Emails sent with the local dev setup are not actually sent - rather, they
# are monitored, and you can view the emails that would have been sent from the web interface.
[inbucket]
# Port to use for the email testing server web interface.
port = $INBUCKET_PORT
smtp_port = $SMTP_PORT
pop3_port = $POP3_PORT

[storage]
# The maximum file size allowed (e.g. "5MB", "500KB").
file_size_limit = "50MiB"

[auth]
# The base URL of your website. Used as an allow-list for redirects and for constructing URLs used
# in emails.
site_url = "http://localhost:3002"
# A list of *exact* URLs that auth providers are permitted to redirect to post authentication.
additional_redirect_urls = ["https://localhost:3002"]
# How long tokens are valid for, in seconds. Defaults to 3600 (1 hour), maximum 604,800 seconds (one
# week).
jwt_expiry = 3600
# Allow/disallow new user signups to your project.
enable_signup = true

[auth.email]
# Allow/disallow new user signups via email to your project.
enable_signup = true
# If enabled, a user will be required to confirm any email change on both the old, and new email
# addresses. If disabled, only the new email is required to confirm.
double_confirm_changes = true
# If enabled, users need to confirm their email address before signing in.
enable_confirmations = false

# Use an external OAuth provider. The full list of providers are: "apple", "azure", "bitbucket",
# "discord", "facebook", "github", "gitlab", "google", "keycloak", "linkedin", "notion", "twitch",
# "twitter", "slack", "spotify", "workos", "zoom".
[auth.external.apple]
enabled = false
client_id = ""
secret = ""
# Overrides the default auth redirectUrl.
redirect_uri = ""
# Overrides the default auth provider URL. Used to support self-hosted gitlab, single-tenant Azure,
# or any other third-party OIDC providers.
url = ""

[analytics]
enabled = false
port = $ANALYTICS_PORT
vector_port = $VECTOR_PORT
# Setup BigQuery project to enable log viewer on local development stack.
gcp_project_id = ""
gcp_project_number = ""
gcp_jwt_path = "supabase/gcloud.json"
EOL

# Update .env with new ports
cat > .env << EOL
# Supabase Configuration
VITE_SUPABASE_URL=http://localhost:$API_PORT
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# API Configuration
VITE_API_URL=http://localhost:$API_PORT
VITE_API_VERSION=v1

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# Application Settings
VITE_APP_NAME=TrackTalent
VITE_APP_ENVIRONMENT=development
VITE_DEFAULT_LOCALE=en

# Storage Configuration
VITE_STORAGE_BUCKET=tracktalent-local
VITE_MAX_UPLOAD_SIZE=5242880

# Authentication Settings
VITE_AUTH_REDIRECT_URL=http://localhost:3002/auth/callback
VITE_PASSWORD_MIN_LENGTH=8

# Rate Limiting
VITE_API_RATE_LIMIT=100
VITE_API_RATE_LIMIT_WINDOW=60000
EOL
