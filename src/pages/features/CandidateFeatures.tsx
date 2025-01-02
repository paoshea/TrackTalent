import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';
import { CandidatePreview } from '../../components/features/CandidatePreview';

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

const JobIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </IconWrapper>
);

const CareerIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </IconWrapper>
);

const SkillIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </IconWrapper>
);

const CandidateFeatures: React.FC = () => {
  const { translate } = useTranslation();

  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          {translate('landing.forCandidates')}
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          {translate('landing.candidateDesc')}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title={translate('features.candidate.smartMatching.title')}
          description={translate('features.candidate.smartMatching.description')}
          icon={<JobIcon />}
        />
        <FeatureCard
          title={translate('features.candidate.careerDev.title')}
          description={translate('features.candidate.careerDev.description')}
          icon={<CareerIcon />}
        />
        <FeatureCard
          title={translate('features.candidate.skillAssess.title')}
          description={translate('features.candidate.skillAssess.description')}
          icon={<SkillIcon />}
        />
      </div>

      {/* Preview Section */}
      <div className="mt-8">
        <CandidatePreview />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Link
            to="/demo/candidate"
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
          Try our demo to explore the candidate dashboard with sample data
        </p>
      </div>
    </>
  );
};

export default CandidateFeatures;
