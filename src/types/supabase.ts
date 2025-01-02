export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string;
          email: string;
          role: 'candidate' | 'employer' | 'partner';
          title: string | null;
          location: string | null;
          company_name: string | null;
          company_size: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          user_id: string;
          full_name: string;
          email: string;
          role: 'candidate' | 'employer' | 'partner';
          title?: string | null;
          location?: string | null;
          company_name?: string | null;
          company_size?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string;
          email?: string;
          role?: 'candidate' | 'employer' | 'partner';
          title?: string | null;
          location?: string | null;
          company_name?: string | null;
          company_size?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
