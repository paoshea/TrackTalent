export interface Database {
  public: {
    Tables: {
      analytics: {
        Row: {
          id: string;
          applications: number;
          interviews: number;
          connections: number;
          messages: number;
          activities: any[];
          trends: {
            daily: number[];
            weekly: number[];
            monthly: number[];
          };
          comparisons: {
            previousPeriod: number;
            industryAverage: number;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          applications: number;
          interviews: number;
          connections: number;
          messages: number;
          activities?: any[];
          trends?: {
            daily: number[];
            weekly: number[];
            monthly: number[];
          };
          comparisons?: {
            previousPeriod: number;
            industryAverage: number;
          };
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          applications?: number;
          interviews?: number;
          connections?: number;
          messages?: number;
          activities?: any[];
          trends?: {
            daily: number[];
            weekly: number[];
            monthly: number[];
          };
          comparisons?: {
            previousPeriod: number;
            industryAverage: number;
          };
          created_at?: string;
          updated_at?: string;
        };
      };
      metric_snapshots: {
        Row: {
          id: string;
          timestamp: string;
          metrics: {
            applications: number;
            interviews: number;
            offers: number;
            hires: number;
            [key: string]: number;
          };
        };
        Insert: {
          id?: string;
          timestamp: string;
          metrics: {
            applications: number;
            interviews: number;
            offers: number;
            hires: number;
            [key: string]: number;
          };
        };
        Update: {
          id?: string;
          timestamp?: string;
          metrics?: {
            applications?: number;
            interviews?: number;
            offers?: number;
            hires?: number;
            [key: string]: number | undefined;
          };
        };
      };
      engagement_stats: {
        Row: {
          id: string;
          views: number;
          interactions: number;
          conversion_rate: number;
          average_time_spent: number;
          bounce_rate: number;
          timestamp: string;
        };
        Insert: {
          id?: string;
          views: number;
          interactions: number;
          conversion_rate: number;
          average_time_spent: number;
          bounce_rate: number;
          timestamp: string;
        };
        Update: {
          id?: string;
          views?: number;
          interactions?: number;
          conversion_rate?: number;
          average_time_spent?: number;
          bounce_rate?: number;
          timestamp?: string;
        };
      };
      status_updates: {
        Row: {
          id: string;
          userId: string;
          content: string;
          type: "info" | "success" | "warning" | "error";
          created_at: string;
          metadata: {
            jobId?: string;
            jobTitle?: string;
            candidateId?: string;
            candidateName?: string;
            interviewId?: string;
            interviewDate?: string;
          } | null;
        };
        Insert: {
          id?: string;
          userId: string;
          content: string;
          type: "info" | "success" | "warning" | "error";
          created_at?: string;
          metadata?: {
            jobId?: string;
            jobTitle?: string;
            candidateId?: string;
            candidateName?: string;
            interviewId?: string;
            interviewDate?: string;
          } | null;
        };
        Update: {
          id?: string;
          userId?: string;
          content?: string;
          type?: "info" | "success" | "warning" | "error";
          created_at?: string;
          metadata?: {
            jobId?: string;
            jobTitle?: string;
            candidateId?: string;
            candidateName?: string;
            interviewId?: string;
            interviewDate?: string;
          } | null;
        };
      };
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          avatar_url: string | null;
          role: "admin" | "customer" | "candidate";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          avatar_url?: string | null;
          role: "admin" | "customer" | "candidate";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          avatar_url?: string | null;
          role?: "admin" | "customer" | "candidate";
          created_at?: string;
          updated_at?: string;
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

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type RealtimePostgresChangesPayload<
  T extends keyof Database["public"]["Tables"],
> = {
  schema: "public";
  table: T;
  commit_timestamp: string;
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: Database["public"]["Tables"][T]["Row"];
  old: Database["public"]["Tables"][T]["Row"];
  errors: null | unknown;
};
