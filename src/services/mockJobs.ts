import type { Job } from "../types/jobs";

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    description: "Join our team as a Senior Software Engineer and help build the next generation of our platform.",
    type: "full-time",
    location: "San Francisco, CA",
    companyId: "1",
    company: {
      id: "1",
      name: "TechCorp",
      logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%234F46E5"/><text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em">T</text></svg>`
    },
    compensation: {
      salary: {
        min: 150000,
        max: 200000,
        currency: "USD",
        period: "yearly"
      }
    },
    skills: ["React", "TypeScript", "Node.js"],
    status: "published",
    applicantCount: 45,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    publishedAt: "2024-01-15T00:00:00Z",
    requirements: ["5+ years of experience", "Strong problem-solving skills"],
    benefits: ["Health insurance", "401k", "Remote work"],
    department: "Engineering",
    experienceLevel: "senior",
    remote: {
      allowed: true,
      type: "fully"
    },
    salaryRange: {
      min: 150000,
      max: 200000,
      currency: "USD",
      period: "yearly"
    }
  },
  {
    id: "2",
    title: "Product Designer",
    description: "Looking for a talented Product Designer to help shape our user experience.",
    type: "full-time",
    location: "New York, NY",
    companyId: "2",
    company: {
      id: "2",
      name: "DesignHub",
      logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23EC4899"/><text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em">D</text></svg>`
    },
    compensation: {
      salary: {
        min: 120000,
        max: 160000,
        currency: "USD",
        period: "yearly"
      }
    },
    skills: ["Figma", "UI/UX", "Design Systems"],
    status: "published",
    applicantCount: 32,
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
    publishedAt: "2024-01-14T00:00:00Z",
    requirements: ["3+ years of experience", "Strong portfolio"],
    benefits: ["Health insurance", "Unlimited PTO", "Remote work"],
    department: "Design",
    experienceLevel: "mid",
    remote: {
      allowed: true,
      type: "hybrid"
    },
    salaryRange: {
      min: 120000,
      max: 160000,
      currency: "USD",
      period: "yearly"
    }
  },
  {
    id: "3",
    title: "Full Stack Developer",
    description: "Join our growing team as a Full Stack Developer and work on exciting projects.",
    type: "full-time",
    location: "Austin, TX",
    companyId: "3",
    company: {
      id: "3",
      name: "WebStack",
      logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2310B981"/><text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em">W</text></svg>`
    },
    compensation: {
      salary: {
        min: 100000,
        max: 140000,
        currency: "USD",
        period: "yearly"
      }
    },
    skills: ["JavaScript", "Python", "AWS"],
    status: "published",
    applicantCount: 28,
    createdAt: "2024-01-13T00:00:00Z",
    updatedAt: "2024-01-13T00:00:00Z",
    publishedAt: "2024-01-13T00:00:00Z",
    requirements: ["2+ years of experience", "Full stack development experience"],
    benefits: ["Health insurance", "Stock options", "Flexible hours"],
    department: "Engineering",
    experienceLevel: "mid",
    remote: {
      allowed: true,
      type: "hybrid"
    },
    salaryRange: {
      min: 100000,
      max: 140000,
      currency: "USD",
      period: "yearly"
    }
  }
];

export async function getRecommendedJobs(): Promise<Job[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockJobs;
}
