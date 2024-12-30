
import React from "react";
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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Logo className="h-16 w-auto mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-8">Browse Jobs</h1>
      <div className="grid gap-6">
        <JobSearch />
        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          <JobSearchFilters />
          <JobList jobs={mockJobs} />
        </div>
      </div>
    </div>
  );
}
