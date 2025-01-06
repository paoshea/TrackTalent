import React from 'react';
import { Search, BookOpen, Users, BarChart, Building2, Briefcase, Network, LineChart, Cog } from 'lucide-react';
import type { UserRole } from '../../types/auth';

interface FeaturesProps {
  role: UserRole;
}

const Features: React.FC<FeaturesProps> = ({ role }) => {
  const features = {
    candidate: [
      {
        name: 'Smart Job Search',
        description: 'Find relevant opportunities with AI-powered job matching and recommendations.',
        icon: Search,
      },
      {
        name: 'Career Development',
        description: 'Access learning resources, skill assessments, and career path planning tools.',
        icon: BookOpen,
      },
      {
        name: 'Professional Network',
        description: 'Connect with industry professionals, mentors, and like-minded peers.',
        icon: Users,
      },
    ],
    employer: [
      {
        name: 'Talent Acquisition',
        description: 'Streamline your hiring with smart candidate matching and automated screening.',
        icon: Building2,
      },
      {
        name: 'Recruitment Analytics',
        description: 'Make data-driven decisions with comprehensive hiring metrics and insights.',
        icon: BarChart,
      },
      {
        name: 'Employer Branding',
        description: 'Build your employer brand and showcase your company culture.',
        icon: Briefcase,
      },
    ],
    partner: [
      {
        name: 'Integration Tools',
        description: 'Access powerful APIs and custom workflows for seamless integration.',
        icon: Network,
      },
      {
        name: 'Analytics Platform',
        description: 'Track performance metrics and gain valuable market insights.',
        icon: LineChart,
      },
      {
        name: 'Customization',
        description: 'Tailor solutions to meet your specific business needs.',
        icon: Cog,
      },
    ],
  };

  const currentFeatures = features[role];
  const colors = {
    candidate: 'blue',
    employer: 'green',
    partner: 'purple',
  };
  const currentColor = colors[role];

  return (
    <div>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className={`text-3xl font-extrabold text-gray-900 sm:text-4xl`}>
          Features for {role.charAt(0).toUpperCase() + role.slice(1)}s
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Everything you need to succeed on our platform
        </p>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {currentFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.name}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div>
                  <span
                    className={`
                      inline-flex p-3 rounded-lg
                      text-${currentColor}-700 bg-${currentColor}-50
                      group-hover:text-${currentColor}-900 group-hover:bg-${currentColor}-100
                      transition-colors duration-200
                    `}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                  aria-hidden="true"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
