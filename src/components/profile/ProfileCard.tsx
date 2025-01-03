// import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { useProfile } from 'hooks/useProfile';
import { Avatar } from 'components/shared/Avatar';
import { LoadingState } from 'components/shared/LoadingState';

interface ProfileCardProps {
  userId?: string;
  className?: string;
}

export function ProfileCard({ userId, className = '' }: ProfileCardProps) {
  const { user } = useAuth();
  const { profile, loading, error } = useProfile(userId || user?.id);

  if (loading) {
    return <LoadingState />;
  }

  if (error || !profile) {
    return null;
  }

  return (
    <div className={`bg-white shadow rounded-lg p-6 ${className}`}>
      <div className="flex items-center">
        <Avatar
          src={profile.avatar_url}
          alt={profile.full_name}
          className="h-16 w-16"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {profile.full_name}
          </h2>
          <p className="text-sm text-gray-500">{profile.title || 'No title set'}</p>
        </div>
      </div>
      
      {profile.bio && (
        <div className="mt-4">
          <p className="text-gray-600">{profile.bio}</p>
        </div>
      )}

      <div className="mt-4 border-t pt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Location</p>
            <p className="text-gray-900">{profile.location || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Experience</p>
            <p className="text-gray-900">{profile.experience_years} years</p>
          </div>
        </div>
      </div>

      {profile.skills.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium text-gray-500 mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
