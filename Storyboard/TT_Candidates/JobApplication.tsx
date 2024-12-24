import React from 'react';
import { User, Building2, ChevronRight, Mail, Lock, UserPlus, LogIn, ArrowLeft, Check } from 'lucide-react';

// Continue JobApplication component
export const JobApplication = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Apply for Senior Frontend Developer</h2>
      <p className="mt-2 text-gray-600">at TechCorp Inc.</p>
    </div>

    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Resume</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input type="file" className="hidden" id="resume-upload" />
            <label 
              htmlFor="resume-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Upload Resume
            </label>
            <p className="mt-2 text-sm text-gray-500">PDF, DOC, or DOCX up to 5MB</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Cover Letter</h3>
          <textarea
            rows={6}
            placeholder="Why are you interested in this role?"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Job Summary</h3>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Company</h4>
            <p className="text-sm text-gray-600">TechCorp Inc.</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Location</h4>
            <p className="text-sm text-gray-600">San Francisco, CA (Remote)</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Employment Type</h4>
            <p className="text-sm text-gray-600">Full-time</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Experience Level</h4>
            <p className="text-sm text-gray-600">Senior</p>
          </div>
          <div className="pt-4 border-t border-gray-200">
            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Success Message Component
export const ApplicationSuccess = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Application Submitted!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for applying. We'll review your application and get back to you soon.
        </p>
        <div className="mt-6">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            View Application Status
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Application Tracking Components
export const ApplicationTracker = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
      <p className="mt-2 text-gray-600">Track and manage your job applications</p>
    </div>

    <div className="space-y-6">
      {['Pending Review', 'Interview Scheduled', 'Offer Received'].map((status) => (
        <div key={status} className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Senior Frontend Developer</h3>
              <p className="mt-1 text-sm text-gray-600">TechCorp Inc.</p>
              <div className="mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {status}
                </span>
              </div>
            </div>
            <button className="text-sm text-indigo-600 hover:text-indigo-500">
              View Details
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            Applied on March 15, 2024
          </div>
        </div>
      ))}
    </div>
  </div>
);
