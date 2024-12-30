
import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/branding/Logo";
import { JobList } from "../../components/jobs/JobList";
import { JobSearch } from "../../components/jobs/JobSearch";
import { JobSearchFilters } from "../../components/jobs/JobSearchFilters";

const mockJobs = [
  {
    id: "1",
    title: "Senior Software Engineer",
    description: "We are looking for a senior software engineer with React experience",
    type: "full-time",
    location: "Remote",
    company: {
      id: "1",
      name: "TechCorp",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=TechCorp"
    },
    compensation: {
      salary: {
        min: 100000,
        max: 150000,
        currency: "USD",
        period: "yearly"
      }
    },
    skills: ["React", "TypeScript", "Node.js"],
    publishedAt: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "2",
    title: "Product Designer",
    description: "Looking for a product designer to join our growing team",
    type: "full-time",
    location: "New York, NY",
    company: {
      id: "2",
      name: "DesignCo",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=DesignCo"
    },
    compensation: {
      salary: {
        min: 90000,
        max: 130000,
        currency: "USD",
        period: "yearly"
      }
    },
    skills: ["Figma", "UI/UX", "Design Systems"],
    publishedAt: "2024-01-14T00:00:00Z",
    createdAt: "2024-01-14T00:00:00Z"
  }
];

export default function Jobs() {
  const navigate = useNavigate();
  return (
    <MainLayout>
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
      <Logo className="h-48 w-auto mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-8">Browse Jobs</h1>
      <div className="grid gap-6">
        <JobSearch />
        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          <JobSearchFilters />
          <JobList jobs={mockJobs} />
        </div>
      </div>
    </div>
  </MainLayout>
  );
}
