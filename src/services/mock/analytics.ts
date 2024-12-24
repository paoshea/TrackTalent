export const mockAnalytics = {
  candidate: {
    applicationStats: {
      total: 15,
      inReview: 5,
      interviews: 3,
      offers: 1,
    },
    skillMatchRate: 85,
    responseRate: 75,
    averageTimeToResponse: "3 days",
  },
  company: {
    hiringStats: {
      openPositions: 8,
      totalApplications: 124,
      shortlisted: 45,
      interviewed: 28,
    },
    timeToHire: 21,
    offerAcceptanceRate: 85,
    topSourceChannels: [
      { name: "LinkedIn", percentage: 45 },
      { name: "Direct", percentage: 30 },
      { name: "Referrals", percentage: 25 },
    ],
  },
  admin: {
    platformStats: {
      totalUsers: 1250,
      activeJobs: 156,
      successfulPlacements: 89,
      averageTimeToHire: 18,
    },
    userGrowth: {
      candidates: 25,
      companies: 15,
      monthOverMonth: 22,
    },
    revenue: {
      monthly: 45000,
      growth: 18,
    },
  },
};
