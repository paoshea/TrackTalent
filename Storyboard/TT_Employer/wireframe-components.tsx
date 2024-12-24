import React from 'react';
import { User, Building2, ChevronRight, Mail, Lock, UserPlus, LogIn, ArrowLeft, Check } from 'lucide-react';

// Common Layout Components
export const WireframeLayout = ({ children, header = true }) => (
  <div className="min-h-screen bg-gray-50">
    {header && (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-semibold text-indigo-600">TrackTalent</div>
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-gray-500 hover:text-gray-700">Find Jobs</a>
            <a href="#" className="text-gray-500 hover:text-gray-700">For Employers</a>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium">Sign In</a>
          </nav>
        </div>
      </header>
    )}
    {children}
  </div>
);

// Onboarding Flow Components
export const RoleSelection = () => (
  <div className="max-w-2xl mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <h1 className="text-3xl font-bold text-gray-900">Welcome to TrackTalent</h1>
      <p className="mt-2 text-gray-600">Select how you'll be using the platform</p>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2">
      <button className="p-6 bg-white rounded-lg shadow hover:shadow-md border-2 border-transparent hover:border-indigo-500 transition-all">
        <User className="h-8 w-8 text-indigo-600 mx-auto" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Job Seeker</h3>
        <p className="mt-2 text-sm text-gray-500">Find your next opportunity and track your applications</p>
        <ChevronRight className="h-5 w-5 text-gray-400 mx-auto mt-4" />
      </button>
      
      <button className="p-6 bg-white rounded-lg shadow hover:shadow-md border-2 border-transparent hover:border-indigo-500 transition-all">
        <Building2 className="h-8 w-8 text-indigo-600 mx-auto" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Employer</h3>
        <p className="mt-2 text-sm text-gray-500">Post jobs and find the best talent for your team</p>
        <ChevronRight className="h-5 w-5 text-gray-400 mx-auto mt-4" />
      </button>
    </div>
  </div>
);

// Authentication Components
export const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-gray-600">{subtitle}</p>
      </div>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        {children}
      </div>
    </div>
  </div>
);

export const SignUpForm = () => (
  <AuthLayout 
    title="Create your account" 
    subtitle="Start your journey with TrackTalent"
  >
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1">
          <input
            type="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="mt-1">
          <input
            type="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Create Account
      </button>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Google
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            LinkedIn
          </button>
        </div>
      </div>
    </form>
  </AuthLayout>
);

// Candidate Profile Setup Components
export const ProfileSetup = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Complete Your Profile</h2>
      <p className="mt-2 text-gray-600">Help us personalize your job search experience</p>
    </div>

    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
        <div className="mt-1">
          <textarea
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <div className="mt-1">
          <input
            type="text"
            placeholder="Add skills (e.g., JavaScript, React, Project Management)"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Project Management'].map(skill => (
            <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
              {skill}
              <button className="ml-1.5 text-indigo-600 hover:text-indigo-500">×</button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Experience Level</label>
        <div className="mt-1">
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Entry Level</option>
            <option>Mid Level</option>
            <option>Senior Level</option>
            <option>Executive</option>
          </select>
        </div>
      </div>
    </div>

    <div className="mt-6 flex justify-between">
      <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>
      <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
        Continue
        <ChevronRight className="h-4 w-4 ml-2" />
      </button>
    </div>
  </div>
);

// Employer Dashboard Components
export const EmployerJobPost = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
      <p className="mt-2 text-gray-600">Reach thousands of qualified candidates</p>
    </div>

    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Job Title</label>
        <div className="mt-1">
          <input
            type="text"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Job Description</label>
        <div className="mt-1">
          <textarea
            rows={6}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <div className="mt-1">
            <input
              type="text"
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Employment Type</label>
          <div className="mt-1">
            <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Required Skills</label>
        <div className="mt-1">
          <input
            type="text"
            placeholder="Add required skills"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js'].map(skill => (
            <span key={skill} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {skill}
              <button className="ml-1.5 text-blue-600 hover:text-blue-500">×</button>
            </span>
          ))}
        </div>
      </div>
    </div>

    <div className="mt-6 flex justify-end space-x-4">
      <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
        Save as Draft
      </button>
      <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
        Post Job
      </button>
    </div>
  </div>
);

// Candidate Job Application Components
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
                  className="mt-1 w-full rounded-md border-gray-300 shadow