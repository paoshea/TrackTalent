import React from 'react';
import { Outlet } from 'react-router-dom';

interface DashboardProps {
  profile: any;
}

const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {profile.company_name}
            </h1>
            <div className="text-sm text-gray-600">
              {profile.full_name} - {profile.title}
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard content */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
              <h2 className="text-xl font-semibold mb-4">Employer Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium mb-2">Active Jobs</h3>
                  <p className="text-3xl font-bold text-indigo-600">5</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium mb-2">Total Applications</h3>
                  <p className="text-3xl font-bold text-indigo-600">27</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="text-lg font-medium mb-2">Candidates Shortlisted</h3>
                  <p className="text-3xl font-bold text-indigo-600">12</p>
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
