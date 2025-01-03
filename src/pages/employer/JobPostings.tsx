// import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/branding/Logo';
import { Briefcase, Plus, Search } from 'lucide-react';
import { JobList } from '../../components/jobs/JobList';
import { JobForm } from '../../components/jobs/JobForm';
import { mockJobs } from '../../services/mockData';
import { Job, JobRemote, JobSalary } from '../../types/jobs';

// Transform mock data to match component expectations
const formattedJobs: Job[] = mockJobs.map(job => {
  const salary: JobSalary = {
    min: parseInt(job.salary.split(" - ")[0].replace("$", "").replace(",", "")),
    max: parseInt(job.salary.split(" - ")[1].replace("$", "").replace(",", "")),
    currency: "USD",
    period: "yearly"
  };
  
  const remote: JobRemote = {
    allowed: true,
    type: "fully"
  };

  return {
    id: job.id.toString(),
    title: job.title,
    description: job.description,
    type: "full-time",
    location: job.location,
    companyId: job.id.toString(),
    company: {
      id: job.id.toString(),
      name: job.company,
      logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%234F46E5"/><text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em">${job.company.charAt(0)}</text></svg>`
    },
    compensation: {
      salary
    },
    skills: job.requirements,
    status: "published",
    applicantCount: Math.floor(Math.random() * 50),
    createdAt: job.postedDate + "T00:00:00Z",
    updatedAt: job.postedDate + "T00:00:00Z",
    publishedAt: job.postedDate + "T00:00:00Z",
    requirements: job.requirements,
    benefits: ["Health insurance", "401k", "Remote work"],
    department: "Engineering",
    experienceLevel: "senior",
    remote,
    salaryRange: salary
  };
});

export default function JobPostings() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Postings</h1>
        <p className="text-lg text-gray-600">Create and manage job postings with ease</p>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transition-shadow duration-200">
          <Plus className="h-5 w-5 mr-2" />
          Create New Job
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <JobList 
        jobs={formattedJobs}
        isLoading={false}
        hasMore={false}
        onLoadMore={() => {}}
      />
    </div>
  );
}
