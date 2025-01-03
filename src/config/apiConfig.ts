// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:3000';
export const APP_URL = import.meta.env.VITE_APP_URL;

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Environment checks
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Missing Supabase environment variables');
}

// API endpoints
export const endpoints = {
  auth: `${API_URL}/auth`,
  users: `${API_URL}/users`,
  jobs: `${API_URL}/jobs`,
  applications: `${API_URL}/applications`,
  profiles: `${API_URL}/profiles`,
  messages: `${API_URL}/messages`,
};

// WebSocket endpoints
export const wsEndpoints = {
  notifications: `${WEBSOCKET_URL}/notifications`,
  chat: `${WEBSOCKET_URL}/chat`,
};
