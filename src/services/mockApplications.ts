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
      id: "job-1",
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "full-time",
      experience_level: "senior",
      company: {
        id: "company-1",
        name: "TechCorp",
        logo: "/logos/techcorp.png"
      },
    },
    nextStep: "Technical Interview",
    nextStepDate: "2024-01-20T14:00:00Z",
    feedback: "Great initial interview, moving forward with technical round.",
    timeline: [
      {
        id: "1",
        type: "application_submitted",
        description: "Application submitted",
        timestamp: "2024-01-10T00:00:00Z"
      },
      {
        id: "2",
        type: "interview_scheduled",
        description: "Technical interview scheduled",
        timestamp: "2024-01-15T00:00:00Z"
      }
    ],
    metadata: {
      resume_url: "https://example.com/resumes/1.pdf",
      cover_letter: "I am excited to apply for this position...",
      skills: ["JavaScript", "React", "TypeScript"],
      experience: [{
        company: "Previous Tech",
        title: "Software Engineer",
        startDate: "2020-01-01",
        endDate: "2023-12-31",
        current: false,
        description: "Developed web applications using React and TypeScript"
      }],
      education: [{
        institution: "Tech University",
        degree: "Bachelor's",
        field: "Computer Science",
        startDate: "2016-09-01",
        endDate: "2020-05-31",
        current: false
      }]
    }
  },
  {
    id: "2",
    jobId: "2",
    userId: "mock-user-id",
    status: "under_review",
    appliedAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
    job: {
      id: "job-2",
      title: "Product Manager",
      location: "New York, NY",
      type: "full-time",
      experience_level: "senior",
      company: {
        id: "company-2",
        name: "InnovateCo",
        logo: "/logos/innovateco.png"
      },
    },
    nextStep: "Portfolio Review",
    nextStepDate: "2024-01-18T15:00:00Z",
    feedback: "Application under review by the design team.",
    timeline: [
      {
        id: "3",
        type: "application_submitted",
        description: "Application submitted",
        timestamp: "2024-01-12T00:00:00Z"
      },
      {
        id: "4",
        type: "status_update",
        description: "Application under review",
        timestamp: "2024-01-14T00:00:00Z"
      }
    ],
    metadata: {
      resume_url: "https://example.com/resumes/2.pdf",
      cover_letter: "I am passionate about product design...",
      skills: ["UI/UX", "Figma", "Adobe XD"],
      experience: [{
        company: "Design Agency",
        title: "UI Designer",
        startDate: "2021-01-01",
        current: true,
        description: "Creating user interfaces for web and mobile applications"
      }],
      education: [{
        institution: "Design School",
        degree: "Bachelor's",
        field: "Digital Design",
        startDate: "2017-09-01",
        endDate: "2021-05-31",
        current: false
      }]
    }
  },
  {
    id: "3",
    jobId: "3",
    userId: "mock-user-id",
    status: "submitted",
    appliedAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    job: {
      id: "job-3",
      title: "DevOps Engineer",
      location: "Remote",
      type: "full-time",
      experience_level: "mid",
      company: {
        id: "company-3",
        name: "CloudTech",
        logo: "/logos/cloudtech.png"
      },
    },
    nextStep: "Initial Review",
    nextStepDate: null,
    feedback: null,
    timeline: [
      {
        id: "5",
        type: "application_submitted",
        description: "Application submitted",
        timestamp: "2024-01-15T00:00:00Z"
      }
    ],
    metadata: {
      resume_url: "https://example.com/resumes/3.pdf",
      cover_letter: "I am interested in the Full Stack Developer position...",
      skills: ["Node.js", "React", "PostgreSQL"],
      experience: [{
        company: "Startup Inc",
        title: "Junior Developer",
        startDate: "2022-01-01",
        current: true,
        description: "Full stack development using modern web technologies"
      }],
      education: [{
        institution: "Code Academy",
        degree: "Certificate",
        field: "Web Development",
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        current: false
      }]
    }
  }
];

export async function getMockApplications(): Promise<Application[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockApplications;
}
