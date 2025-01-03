import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';
import { PartnerPreview } from '../../components/features/PartnerPreview';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, link }) => (
  <Link to={link} className="block">
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-500 text-white mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  </Link>
);

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {children}
  </svg>
);

const ApprenticeshipIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </IconWrapper>
);

const MentorshipIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </IconWrapper>
);

const AnalyticsIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </IconWrapper>
);

const PartnerFeatures: React.FC = () => {
  const { translate } = useTranslation();

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          {translate('landing.forPartners')}
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          {translate('landing.partnerDesc')}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="Apprenticeship Programs"
          description="Manage and track apprenticeship programs with comprehensive metrics and activity tracking."
          icon={<ApprenticeshipIcon />}
          link="/partners/apprenticeships"
        />
        <FeatureCard
          title="Mentorship Network"
          description="Connect mentors and mentees through our platform with integrated communication tools."
          icon={<MentorshipIcon />}
          link="/partners/mentorship"
        />
        <FeatureCard
          title="Partner Analytics"
          description="Access detailed analytics and insights about your programs and participants."
          icon={<AnalyticsIcon />}
          link="/partners/analytics"
        />
      </div>

      {/* Feature Details */}
      <div className="mt-16 space-y-16">
        {/* Apprenticeship Programs Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Apprenticeship Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Components</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Program overview dashboard</li>
                <li>Comprehensive metrics grid</li>
                <li>Individual metric tracking</li>
                <li>Real-time activity feed</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/partners/apprenticeships"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Programs
              </Link>
            </div>
          </div>
        </div>

        {/* Mentorship Network Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mentorship Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Integrated messaging platform</li>
                <li>Active mentorship tracking</li>
                <li>Status updates and progress</li>
                <li>Mentor-mentee matching</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/partners/mentorship"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Access Network
              </Link>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Partner Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Insights</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Role-specific metrics</li>
                <li>Trend analysis</li>
                <li>Data visualization</li>
                <li>Performance tracking</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/partners/analytics"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="mt-16">
        <PartnerPreview />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Link
            to="/partners/apprenticeships"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {translate('features.tryDemo')}
          </Link>
          <Link
            to="/partners/analytics"
            className="inline-flex items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            {translate('features.exploreMore')}
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          Explore our features with sample data
        </p>
      </div>
    </>
  );
};

export default PartnerFeatures;
