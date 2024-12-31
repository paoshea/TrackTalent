import type { Application } from "../types/applications";

export const mockApplications: Application[] = [
  {
    id: "1",
    jobId: "1",
    userId: "mock-user-id",
    status: "interview_scheduled",
    appliedAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    job: {
      id: "1",
      title: "Senior Software Engineer",
      company: {
        id: "1",
        name: "TechCorp",
        logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%234F46E5"/><text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em">T</text></svg>`
      }
    },
    nextStep: "Technical Interview",
    nextStepDate: "2024-01-20T14:00:00Z",
    feedback: "Great initial interview, moving forward with technical round."
  },
  {
    id: "2",
    jobId: "2",
    userId: "mock-user-id",
    status: "under_review",
    appliedAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
    job: {
      id: "2",
      title: "Product Designer",
      company: {
        id: "2",
        name: "DesignHub",
        logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23EC4899"/><text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em">D</text></svg>`
      }
    },
    nextStep: "Portfolio Review",
    nextStepDate: "2024-01-18T15:00:00Z",
    feedback: "Application under review by the design team."
  },
  {
    id: "3",
    jobId: "3",
    userId: "mock-user-id",
    status: "submitted",
    appliedAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    job: {
      id: "3",
      title: "Full Stack Developer",
      company: {
        id: "3",
        name: "WebStack",
        logo: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2310B981"/><text x="50" y="50" font-size="40" fill="white" text-anchor="middle" dy=".3em">W</text></svg>`
      }
    },
    nextStep: "Initial Review",
    nextStepDate: null,
    feedback: null
  }
];

export async function getMockApplications(): Promise<Application[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockApplications;
}
