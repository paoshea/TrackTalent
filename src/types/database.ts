export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: "candidate" | "employer" | "partner" | null;
          email: string;
          created_at: string;
          resume_url: string | null;
          skills: string[] | null;
          experience: Record<string, unknown>[] | null;
          education: Record<string, unknown>[] | null;
          preferences: string[] | null;
          environment: string | null;
        };
        Insert: {
          id: string;
          email: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "candidate" | "employer" | "partner" | null;
          created_at?: string;
          resume_url?: string | null;
          skills?: string[] | null;
          experience?: Record<string, unknown>[] | null;
          education?: Record<string, unknown>[] | null;
          preferences?: string[] | null;
          environment?: string | null;
        };
        Update: {
          email?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "candidate" | "employer" | "partner" | null;
          created_at?: string;
          resume_url?: string | null;
          skills?: string[] | null;
          experience?: Record<string, unknown>[] | null;
          education?: Record<string, unknown>[] | null;
          preferences?: string[] | null;
          environment?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
