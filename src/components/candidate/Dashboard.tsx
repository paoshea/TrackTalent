import React from 'react';
import { Outlet } from 'react-router-dom';
import type { UserProfile } from '../../types/auth';

interface DashboardProps {
  profile: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, {profile.full_name ?? 'Guest'}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-xl font-semibold mb-4">Candidate Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium mb-2">Profile Views</h3>
                  <p className="text-3xl font-bold text-indigo-600">12</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium mb-2">Applications</h3>
                  <p className="text-3xl font-bold text-indigo-600">3</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium mb-2">Saved Jobs</h3>
                  <p className="text-3xl font-bold text-indigo-600">8</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                This is a demo dashboard with mock data for guest users.
              </p>
            </div>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
