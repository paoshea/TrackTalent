import type { UserMetadata } from "./auth";

declare module "@supabase/supabase-js" {
  interface User {
    user_metadata: UserMetadata;
  }
}
