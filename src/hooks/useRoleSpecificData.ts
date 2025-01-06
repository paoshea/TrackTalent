import { useState, useEffect } from 'react';
import { 
  mockJobs, 
  mockSuccessStories, 
  mockResources, 
  mockPartnerStats
} from '../services/mockData';

interface RoleData {
  jobs?: typeof mockJobs;
  stories?: typeof mockSuccessStories;
  resources?: typeof mockResources;
  stats?: {
    analytics: typeof mockPartnerStats.analytics;
    apprenticeships: typeof mockPartnerStats.apprenticeships;
    mentorship: typeof mockPartnerStats.mentorship;
  };
  loading: boolean;
  error: Error | null;
}

export const useRoleSpecificData = (role: 'candidate' | 'employer' | 'partner') => {
  const [data, setData] = useState<RoleData>({
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate network delay for realistic loading state
        await new Promise(resolve => setTimeout(resolve, 500));

        // Load data based on role
        switch (role) {
          case 'candidate':
            setData({
              jobs: mockJobs.filter(job => job.title.toLowerCase().includes('apprentice')),
              stories: mockSuccessStories,
              resources: mockResources.filter(r => r.type === 'Structured Program'),
              loading: false,
              error: null
            });
            break;

          case 'employer':
            setData({
              jobs: mockJobs.filter(job => !job.title.toLowerCase().includes('apprentice')),
              stories: mockSuccessStories.filter(s => s.company === 'TechCorp'),
              stats: mockPartnerStats, // Include all stats for employers
              loading: false,
              error: null
            });
            break;

          case 'partner':
            setData({
              stats: mockPartnerStats,
              stories: mockSuccessStories.filter(s => s.progression?.length > 2),
              loading: false,
              error: null
            });
            break;

          default:
            setData({
              loading: false,
              error: new Error('Invalid role specified')
            });
        }
      } catch (error) {
        setData({
          loading: false,
          error: error as Error
        });
      }
    };

    loadData();
  }, [role]);

  // Progressive data loading handlers
  const loadMore = async () => {
    setData(prev => ({ ...prev, loading: true }));
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Add more items based on role
      switch (role) {
        case 'candidate':
          setData(prev => ({
            ...prev,
            jobs: [...(prev.jobs || []), ...mockJobs.slice(0, 2)],
            loading: false
          }));
          break;

        case 'employer':
          setData(prev => ({
            ...prev,
            stories: [...(prev.stories || []), mockSuccessStories[0]],
            loading: false
          }));
          break;

        case 'partner':
          setData(prev => ({
            ...prev,
            stories: [...(prev.stories || []), ...mockSuccessStories],
            loading: false
          }));
          break;
      }
    } catch (error) {
      setData(prev => ({
        ...prev,
        loading: false,
        error: error as Error
      }));
    }
  };

  // Demo mode handlers
  const getDemoData = () => {
    switch (role) {
      case 'candidate':
        return {
          jobs: mockJobs.map(job => ({
            ...job,
            salary: job.salary?.replace('$', '💰'),
            requirements: job.requirements?.map(r => `✨ ${r}`)
          })),
          stories: mockSuccessStories.map(story => ({
            ...story,
            outcome: `🚀 ${story.outcome}`
          }))
        };

      case 'employer':
        return {
          stats: {
            ...mockPartnerStats,
            analytics: {
              ...mockPartnerStats.analytics,
              placements: {
                ...mockPartnerStats.analytics.placements,
                total: mockPartnerStats.analytics.placements.total + ' 🎯'
              }
            }
          }
        };

      case 'partner':
        return {
          stats: {
            ...mockPartnerStats,
            mentorship: {
              ...mockPartnerStats.mentorship,
              network: {
                ...mockPartnerStats.mentorship.network,
                globalReach: '🌍 ' + mockPartnerStats.mentorship.network.globalReach
              }
            }
          }
        };

      default:
        return {};
    }
  };

  return {
    ...data,
    loadMore,
    getDemoData,
    hasMore: true // You can implement actual pagination logic here
  };
};
