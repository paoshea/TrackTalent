interface VerifiedSkill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  verifiedDate: string;
  verifiedBy: string;
}

interface CareerPath {
  current: string;
  next: string;
  timeToNext: string;
  requiredSkills: string[];
  mentorshipAvailable: boolean;
}

export const mockJobs = [
  {
    id: 1,
    title: "Software Development Apprentice",
    company: "TechCorp",
    location: "Remote",
    salary: "$50,000 - $65,000",
    description: "Start your tech career with our structured apprenticeship program. Learn from experienced mentors while working on real projects.",
    requirements: ["Basic coding knowledge", "Strong learning aptitude", "Communication skills"],
    benefits: ["Mentorship program", "Skill certification", "Career progression path"],
    careerPath: {
      current: "Apprentice Developer",
      next: "Junior Developer",
      timeToNext: "12 months",
      requiredSkills: ["JavaScript", "React Basics", "Git"],
      mentorshipAvailable: true
    },
    verifiedSkills: [
      {
        name: "JavaScript",
        level: "beginner",
        verifiedDate: "2024-01-15",
        verifiedBy: "TechCorp Academy"
      }
    ],
    postedDate: "2024-01-15"
  },
  {
    id: 2,
    title: "Junior Product Manager",
    company: "Innovation Inc",
    location: "New York, NY",
    salary: "$60,000 - $80,000",
    description: "Kickstart your product management career with hands-on experience and mentorship.",
    requirements: ["Basic understanding of product lifecycle", "Analytical mindset", "Communication skills"],
    benefits: ["Product certification", "Leadership training", "Career coaching"],
    careerPath: {
      current: "Junior PM",
      next: "Associate PM",
      timeToNext: "18 months",
      requiredSkills: ["Agile", "Data Analysis", "User Research"],
      mentorshipAvailable: true
    },
    verifiedSkills: [
      {
        name: "Agile",
        level: "beginner",
        verifiedDate: "2024-01-14",
        verifiedBy: "PM Institute"
      }
    ],
    postedDate: "2024-01-14"
  }
];

export const mockSuccessStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "From Apprentice to Tech Lead",
    company: "TechCorp",
    story: "Started as an apprentice developer with basic coding knowledge. Through our structured program, gained hands-on experience, earned certifications, and progressed to Tech Lead within 4 years.",
    progression: [
      { role: "Apprentice Developer", duration: "1 year", skills: ["JavaScript", "HTML/CSS"] },
      { role: "Junior Developer", duration: "1.5 years", skills: ["React", "Node.js"] },
      { role: "Senior Developer", duration: "1 year", skills: ["System Design", "Team Leadership"] },
      { role: "Tech Lead", duration: "Current", skills: ["Project Management", "Architecture"] }
    ],
    outcome: {
      salaryIncrease: "300%",
      timeToPromotion: "4 years",
      certifications: ["Full Stack Developer", "AWS Certified"],
      mentorship: "Now mentoring 3 apprentices"
    },
    image: "https://placeholder.com/150"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Marketing to Product Management Star",
    company: "Innovation Inc",
    story: "Transitioned from marketing to product management through our career change program. Received mentorship, hands-on training, and real project experience.",
    progression: [
      { role: "Marketing Specialist", duration: "Previous role", skills: ["Marketing Analytics"] },
      { role: "Associate PM", duration: "1 year", skills: ["Agile", "User Research"] },
      { role: "Product Manager", duration: "Current", skills: ["Product Strategy", "Stakeholder Management"] }
    ],
    outcome: {
      salaryIncrease: "85%",
      timeToPromotion: "2 years",
      certifications: ["Product Management Professional", "Agile Certified"],
      mentorship: "Leading product workshops"
    },
    image: "https://placeholder.com/150"
  }
];

export const mockResources = [
  {
    id: 1,
    title: "Web Development Career Path",
    type: "Structured Program",
    provider: "TechCorp Academy",
    duration: "12 months",
    description: "Complete career development program with mentorship and real project experience",
    includes: [
      { type: "Course", name: "Frontend Fundamentals", duration: "12 weeks" },
      { type: "Workshop", name: "Backend Development", duration: "12 weeks" },
      { type: "Project", name: "Full Stack Application", duration: "8 weeks" },
      { type: "Mentorship", name: "1:1 Career Guidance", duration: "Ongoing" }
    ],
    certification: {
      name: "Full Stack Developer Certification",
      verifiedBy: "TechCorp",
      validityPeriod: "3 years"
    },
    careerOutcomes: {
      averageSalary: "$75,000",
      placementRate: "92%",
      promotionTime: "18 months"
    }
  },
  {
    id: 2,
    title: "Product Management Acceleration",
    type: "Career Program",
    provider: "PM Institute",
    duration: "9 months",
    description: "Comprehensive product management program with industry mentorship",
    includes: [
      { type: "Course", name: "Product Strategy", duration: "8 weeks" },
      { type: "Workshop", name: "User Research", duration: "6 weeks" },
      { type: "Project", name: "Product Launch", duration: "12 weeks" },
      { type: "Mentorship", name: "Industry Expert Guidance", duration: "Ongoing" }
    ],
    certification: {
      name: "Product Management Professional",
      verifiedBy: "PM Institute",
      validityPeriod: "2 years"
    },
    careerOutcomes: {
      averageSalary: "$85,000",
      placementRate: "88%",
      promotionTime: "24 months"
    }
  }
];

export const mockPartnerStats = {
  analytics: {
    talentPool: {
      totalCandidates: 15000,
      activeLearners: 5000,
      verifiedSkills: 25000,
      skillGrowthRate: "45%"
    },
    placements: {
      total: 1500,
      averageSalaryIncrease: "85%",
      retentionRate: "92%",
      careerProgression: "78%"
    },
    skills: {
      top: ["JavaScript", "Python", "Product Management"],
      emerging: ["AI/ML", "Cloud Architecture", "Data Science"],
      certifications: 3500,
      verificationRate: "95%"
    }
  },
  apprenticeships: {
    programs: {
      active: 25,
      companies: 50,
      industries: ["Tech", "Finance", "Healthcare"],
      averageDuration: "12 months"
    },
    outcomes: {
      completionRate: "89%",
      hireRate: "85%",
      promotionRate: "72%",
      averageTimeToPromotion: "18 months"
    },
    impact: {
      economicMobility: "65% income increase",
      skillGap: "90% reduction",
      diversityImprovement: "45% increase"
    }
  },
  mentorship: {
    network: {
      activeMentors: 500,
      mentorshipHours: 15000,
      specializations: 25,
      globalReach: "15 countries"
    },
    effectiveness: {
      satisfactionRate: "95%",
      skillAcquisition: "85%",
      careerAdvancement: "75%",
      networkGrowth: "150%"
    },
    industries: {
      primary: ["Tech", "Finance", "Healthcare"],
      growing: ["Green Tech", "Digital Health", "EdTech"],
      demandGrowth: "45% yearly"
    }
  }
};

export interface Application {
  id: string;
  candidate: {
    name: string;
    email: string;
    avatar?: string;
    verifiedSkills: VerifiedSkill[];
    careerPath: CareerPath;
    mentorship: {
      mentor?: string;
      programType: string;
      startDate: string;
    };
  };
  job: {
    title: string;
    company: string;
    department: string;
    careerPath: CareerPath;
  };
  status: 'pending' | 'reviewing' | 'interviewed' | 'offered' | 'rejected';
  assessment: {
    skillMatch: number;
    cultureFit: number;
    growthPotential: number;
    verifiedScore: number;
  };
  appliedDate: string;
  lastActivity: string;
}

export const mockApplications: Application[] = [
  {
    id: "1",
    candidate: {
      name: "John Smith",
      email: "john.smith@example.com",
      verifiedSkills: [
        {
          name: "JavaScript",
          level: "intermediate",
          verifiedDate: "2023-12-15",
          verifiedBy: "TechCorp Academy"
        },
        {
          name: "React",
          level: "beginner",
          verifiedDate: "2024-01-10",
          verifiedBy: "TechCorp Academy"
        }
      ],
      careerPath: {
        current: "Junior Developer",
        next: "Mid-level Developer",
        timeToNext: "12 months",
        requiredSkills: ["React", "Node.js", "TypeScript"],
        mentorshipAvailable: true
      },
      mentorship: {
        mentor: "Sarah Johnson",
        programType: "Technical Development",
        startDate: "2024-01-01"
      }
    },
    job: {
      title: "Mid-level Developer",
      company: "TechCorp",
      department: "Product Engineering",
      careerPath: {
        current: "Mid-level Developer",
        next: "Senior Developer",
        timeToNext: "24 months",
        requiredSkills: ["System Design", "Team Leadership", "Architecture"],
        mentorshipAvailable: true
      }
    },
    status: "reviewing",
    assessment: {
      skillMatch: 85,
      cultureFit: 90,
      growthPotential: 95,
      verifiedScore: 88
    },
    appliedDate: "2024-01-15T10:00:00Z",
    lastActivity: "2024-01-16T14:30:00Z"
  },
  {
    id: "2",
    candidate: {
      name: "Emily Brown",
      email: "emily.brown@example.com",
      verifiedSkills: [
        {
          name: "Product Strategy",
          level: "intermediate",
          verifiedDate: "2023-11-20",
          verifiedBy: "PM Institute"
        },
        {
          name: "Agile",
          level: "advanced",
          verifiedDate: "2023-12-05",
          verifiedBy: "PM Institute"
        }
      ],
      careerPath: {
        current: "Associate PM",
        next: "Product Manager",
        timeToNext: "6 months",
        requiredSkills: ["Product Strategy", "Stakeholder Management"],
        mentorshipAvailable: true
      },
      mentorship: {
        mentor: "Michael Chen",
        programType: "Product Leadership",
        startDate: "2023-12-01"
      }
    },
    job: {
      title: "Product Manager",
      company: "Innovation Inc",
      department: "Product",
      careerPath: {
        current: "Product Manager",
        next: "Senior PM",
        timeToNext: "24 months",
        requiredSkills: ["Product Vision", "Team Leadership", "Strategic Planning"],
        mentorshipAvailable: true
      }
    },
    status: "interviewed",
    assessment: {
      skillMatch: 92,
      cultureFit: 95,
      growthPotential: 90,
      verifiedScore: 93
    },
    appliedDate: "2024-01-14T09:15:00Z",
    lastActivity: "2024-01-16T11:45:00Z"
  }
];
