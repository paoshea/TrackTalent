import React from 'react';
import { Outlet } from 'react-router-dom';

const CandidateDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Candidate Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
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
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <ul className="divide-y divide-gray-200">
                    <li className="p-4">
                      <p className="text-sm text-gray-600">Applied to Senior Developer position</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </li>
                    <li className="p-4">
                      <p className="text-sm text-gray-600">Profile viewed by Tech Corp</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </li>
                    <li className="p-4">
                      <p className="text-sm text-gray-600">Completed Skill Assessment</p>
                      <p className="text-xs text-gray-400">2 days ago</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default CandidateDashboard;
