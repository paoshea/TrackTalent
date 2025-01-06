import { createClient } from '@supabase/supabase-js';
import type { User } from '../types/auth';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

interface Tables {
  users: {
    Row: {
      id: string;
      email: string;
      role: string;
      name: string;
      company?: string;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Tables['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
    Update: Partial<Tables['users']['Insert']>;
  };
  // Add other tables as needed
}

export const supabase = createClient<Tables>(supabaseUrl, supabaseAnonKey);

export type { User, Tables };
