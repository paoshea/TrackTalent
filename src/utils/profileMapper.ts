import type { ProfileData } from "../types/onboarding";
import type { Database } from "../types/database";

type Tables = Database['public']['Tables'];
type Profile = Tables['profiles'];

export function mapProfileDataToDatabase(data: ProfileData, userId: string): Profile['Insert'] {
  return {
    id: userId,
    email: data.email,
    full_name: `${data.firstName} ${data.lastName}`,
    avatar_url: data.avatar || null,
    updated_at: new Date().toISOString()
  };
}

export function mapDatabaseToProfileData(profile: Profile['Row']): ProfileData {
  const [firstName = '', lastName = ''] = (profile.full_name || '').split(' ');
  
  return {
    firstName,
    lastName,
    email: profile.email,
    avatar: profile.avatar_url || undefined
  };
}
