export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          role: 'candidate' | 'employer' | 'partner'
          email: string
          created_at: string
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'candidate' | 'employer' | 'partner'
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: 'candidate' | 'employer' | 'partner'
          email?: string
          created_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          industry: string
          size_range: string
          website: string | null
          logo_url: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          industry: string
          size_range: string
          website?: string | null
          logo_url?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          industry?: string
          size_range?: string
          website?: string | null
          logo_url?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          company_id: string
          title: string
          description: string | null
          location: string | null
          type: string
          experience_level: string
          salary_min: number | null
          salary_max: number | null
          salary_currency: string
          requirements: string[] | null
          responsibilities: string[] | null
          benefits: string[] | null
          status: string
          created_at: string
          updated_at: string
          expires_at: string | null
          metadata: Json
        }
        Insert: {
          id?: string
          company_id: string
          title: string
          description?: string | null
          location?: string | null
          type: string
          experience_level: string
          salary_min?: number | null
          salary_max?: number | null
          salary_currency?: string
          requirements?: string[] | null
          responsibilities?: string[] | null
          benefits?: string[] | null
          status?: string
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          metadata?: Json
        }
        Update: {
          id?: string
          company_id?: string
          title?: string
          description?: string | null
          location?: string | null
          type?: string
          experience_level?: string
          salary_min?: number | null
          salary_max?: number | null
          salary_currency?: string
          requirements?: string[] | null
          responsibilities?: string[] | null
          benefits?: string[] | null
          status?: string
          created_at?: string
          updated_at?: string
          expires_at?: string | null
          metadata?: Json
        }
      }
      activity_interactions: {
        Row: {
          id: string
          activity_id: string
          user_id: string
          type: string
          target_id: string
          target_type: string
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          activity_id: string
          user_id: string
          type: string
          target_id: string
          target_type: string
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          activity_id?: string
          user_id?: string
          type?: string
          target_id?: string
          target_type?: string
          metadata?: Json
          created_at?: string
        }
      }
      activities: {
        Row: {
          id: string
          type: 'job_posted' | 'application_received' | 'interview_scheduled' | 'interview_completed' | 'offer_sent' | 'offer_accepted' | 'candidate_hired' | 'status_update'
          title: string
          description: string
          snapshotDate: string
          metadata: Json
        }
        Insert: {
          id?: string
          type: 'job_posted' | 'application_received' | 'interview_scheduled' | 'interview_completed' | 'offer_sent' | 'offer_accepted' | 'candidate_hired' | 'status_update'
          title: string
          description: string
          snapshotDate?: string
          metadata?: Json
        }
        Update: {
          id?: string
          type?: 'job_posted' | 'application_received' | 'interview_scheduled' | 'interview_completed' | 'offer_sent' | 'offer_accepted' | 'candidate_hired' | 'status_update'
          title?: string
          description?: string
          snapshotDate?: string
          metadata?: Json
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          candidate_id: string
          status: string
          cover_letter: string | null
          resume_url: string | null
          answers: Json
          timeline: Json[]
          feedback: Json
          metadata: Json
          created_at: string
          updated_at: string
          submitted_at: string | null
        }
        Insert: {
          id?: string
          job_id: string
          candidate_id: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          answers?: Json
          timeline?: Json[]
          feedback?: Json
          metadata?: Json
          created_at?: string
          updated_at?: string
          submitted_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string
          candidate_id?: string
          status?: string
          cover_letter?: string | null
          resume_url?: string | null
          answers?: Json
          timeline?: Json[]
          feedback?: Json
          metadata?: Json
          created_at?: string
          updated_at?: string
          submitted_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_application_timeline_event: {
        Args: {
          application_id: string
          event_type: string
          event_data?: Json
        }
        Returns: void
      }
      append_to_array: {
        Args: {
          arr: Json[],
          new_element: Json
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
