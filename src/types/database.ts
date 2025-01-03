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
      applications: {
        Row: {
          id: string;
          job_id: string;
          candidate_id: string;
          status: string;
          cover_letter: string | null;
          resume_url: string | null;
          answers: Record<string, unknown> | null;
          timeline: Record<string, unknown>[];
          feedback: Record<string, unknown> | null;
          metadata: Record<string, unknown> | null;
          created_at: string;
          updated_at: string;
          submitted_at: string | null;
          next_step: string | null;
          next_step_date: string | null;
        };
        Insert: {
          job_id: string;
          candidate_id: string;
          status: string;
          cover_letter?: string | null;
          resume_url?: string | null;
          answers?: Record<string, unknown> | null;
          timeline?: Record<string, unknown>[];
          feedback?: Record<string, unknown> | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
          submitted_at?: string | null;
          next_step?: string | null;
          next_step_date?: string | null;
        };
        Update: {
          job_id?: string;
          candidate_id?: string;
          status?: string;
          cover_letter?: string | null;
          resume_url?: string | null;
          answers?: Record<string, unknown> | null;
          timeline?: Record<string, unknown>[];
          feedback?: Record<string, unknown> | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string;
          updated_at?: string;
          submitted_at?: string | null;
          next_step?: string | null;
          next_step_date?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      append_to_array: {
        Args: {
          arr: string;
          item: Record<string, unknown>;
        };
        Returns: Record<string, unknown>[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
