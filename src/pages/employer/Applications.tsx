import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/branding/Logo';
import { mockApplications, Application } from '../../services/mockData';

const ApplicationCard: React.FC<{ application: Application }> = ({ application }) => (
  <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
          {application.candidate.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{application.candidate.name}</h3>
          <p className="text-sm text-gray-500">{application.candidate.email}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
        application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        application.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
        application.status === 'interviewed' ? 'bg-purple-100 text-purple-800' :
        application.status === 'offered' ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'
      }`}>
        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
      </span>
    </div>
    <div className="border-t border-gray-200 pt-4">
      <h4 className="text-base font-medium text-gray-900">{application.job.title}</h4>
      <p className="text-sm text-gray-500">{application.job.company}</p>
    </div>
    <div className="mt-4 flex justify-between text-sm text-gray-500">
      <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
      <span>Last activity: {new Date(application.lastActivity).toLocaleDateString()}</span>
    </div>
  </div>
);

export default function Applications() {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      <div className="text-center mb-12">
        <Logo className="h-48 w-auto mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Applications</h1>
        <p className="text-lg text-gray-600">Review and manage job applications</p>
      </div>

      <div className="grid gap-6">
        {mockApplications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  );
}
