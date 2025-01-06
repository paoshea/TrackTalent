// import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import type { User } from '../../types/auth';

interface DashboardProps {
  user: User;
}

function DashboardContent({ user }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
          <div className="text-lg font-medium text-gray-900">
            Welcome back, {user.user_metadata.full_name ?? 'Guest'}
          </div>
          {user.company && (
            <div className="mt-1 text-sm text-gray-500">
              {user.company}
            </div>
          )}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Add dashboard widgets here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please sign in to view your dashboard.</p>
      </div>
    );
  }

  return <DashboardContent user={user} />;
}
