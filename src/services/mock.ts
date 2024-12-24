// Mock data for development
export const mockActivities = [
  {
    id: "1",
    type: "application",
    action: "applied to",
    target: "Senior Frontend Developer at TechCorp",
    timestamp: new Date().toISOString(),
    user: {
      id: "1",
      name: "John Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  },
  {
    id: "2",
    type: "interview",
    action: "scheduled interview for",
    target: "Software Engineer at StartupX",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    user: {
      id: "2",
      name: "Jane Smith",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  },
];

export const mockMetrics = {
  applications: 12,
  interviews: 5,
  offers: 2,
  response_rate: 75,
};
