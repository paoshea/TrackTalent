import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';
import { EmployerPreview } from '../../components/features/EmployerPreview';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <div className="flex items-center justify-center w-12 h-12 rounded-md bg-indigo-500 text-white mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {children}
  </svg>
);

const SearchIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </IconWrapper>
);

const TrackingIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </IconWrapper>
);

const InterviewIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </IconWrapper>
);

const EmployerFeatures: React.FC = () => {
  const { translate } = useTranslation();

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          {translate('landing.forEmployers')}
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          {translate('landing.employerDesc')}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title={translate('features.employer.search.title')}
          description={translate('features.employer.search.description')}
          icon={<SearchIcon />}
        />
        <FeatureCard
          title={translate('features.employer.tracking.title')}
          description={translate('features.employer.tracking.description')}
          icon={<TrackingIcon />}
        />
        <FeatureCard
          title={translate('features.employer.interview.title')}
          description={translate('features.employer.interview.description')}
          icon={<InterviewIcon />}
        />
      </div>

      {/* Preview Section */}
      <div className="mt-8">
        <EmployerPreview />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Link
            to="/demo/employer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {translate('features.tryDemo')}
          </Link>
          <Link
            to="/auth/register"
            className="inline-flex items-center px-6 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
          >
            {translate('features.exploreMore')}
          </Link>
        </div>
        <p className="text-sm text-gray-500">
          {translate('landing.tryDemo')}
        </p>
      </div>
    </>
  );
};

export default EmployerFeatures;
