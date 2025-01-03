export const mockJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "Remote",
    salary: "$120,000 - $150,000",
    description: "Looking for an experienced software engineer to join our team...",
    requirements: ["5+ years experience", "React", "Node.js", "TypeScript"],
    postedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Innovation Inc",
    location: "New York, NY",
    salary: "$130,000 - $160,000",
    description: "Seeking a product manager to lead our flagship product...",
    requirements: ["3+ years PM experience", "Agile", "Data Analysis"],
    postedDate: "2024-01-14"
  }
];

export const mockSuccessStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "From Bootcamp to Senior Developer",
    company: "TechCorp",
    story: "After completing a coding bootcamp, Sarah landed her dream job...",
    outcome: "Increased salary by 150% within 2 years",
    image: "https://placeholder.com/150"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Career Transition Success",
    company: "Innovation Inc",
    story: "Michael successfully transitioned from marketing to product management...",
    outcome: "Found perfect role within 3 months",
    image: "https://placeholder.com/150"
  }
];

export const mockResources = [
  {
    id: 1,
    title: "Complete Web Development Guide",
    type: "Course",
    provider: "CodeAcademy",
    duration: "12 weeks",
    description: "Comprehensive web development course covering frontend and backend..."
  },
  {
    id: 2,
    title: "Product Management Fundamentals",
    type: "Workshop",
    provider: "PM Institute",
    duration: "4 weeks",
    description: "Learn the basics of product management..."
  }
];

export const mockPartnerStats = {
  analytics: {
    totalPlacements: 1500,
    averageSalaryIncrease: "45%",
    satisfactionRate: "92%",
    topSkills: ["JavaScript", "Python", "Product Management"]
  },
  apprenticeships: {
    activePrograms: 25,
    partneredCompanies: 50,
    successRate: "89%",
    averageHireRate: "75%"
  },
  mentorship: {
    activeMentors: 200,
    mentorshipHours: 5000,
    successStories: 300,
    topIndustries: ["Tech", "Finance", "Healthcare"]
  }
};

export interface Application {
  id: string;
  candidate: {
    name: string;
    email: string;
    avatar?: string;
  };
  job: {
    title: string;
    company: string;
  };
  status: 'pending' | 'reviewing' | 'interviewed' | 'offered' | 'rejected';
  appliedDate: string;
  lastActivity: string;
}

export const mockApplications: Application[] = [
  {
    id: "1",
    candidate: {
      name: "John Smith",
      email: "john.smith@example.com"
    },
    job: {
      title: "Senior Software Engineer",
      company: "TechCorp"
    },
    status: "reviewing",
    appliedDate: "2024-01-15T10:00:00Z",
    lastActivity: "2024-01-16T14:30:00Z"
  },
  {
    id: "2",
    candidate: {
      name: "Emily Brown",
      email: "emily.brown@example.com"
    },
    job: {
      title: "Product Manager",
      company: "Innovation Inc"
    },
    status: "interviewed",
    appliedDate: "2024-01-14T09:15:00Z",
    lastActivity: "2024-01-16T11:45:00Z"
  },
  {
    id: "3",
    candidate: {
      name: "David Wilson",
      email: "david.wilson@example.com"
    },
    job: {
      title: "Senior Software Engineer",
      company: "TechCorp"
    },
    status: "pending",
    appliedDate: "2024-01-16T08:30:00Z",
    lastActivity: "2024-01-16T08:30:00Z"
  }
];
