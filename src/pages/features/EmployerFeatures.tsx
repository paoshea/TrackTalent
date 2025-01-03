import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';
import { EmployerPreview } from '../../components/features/EmployerPreview';

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

const JobIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </IconWrapper>
);

const PipelineIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </IconWrapper>
);

const AnalyticsIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
          title="Job Management"
          description="Create and manage job postings with comprehensive details, requirements, and compensation information."
          icon={<JobIcon />}
          link="/employer/job-postings"
        />
        <FeatureCard
          title="Candidate Pipeline"
          description="Track and manage applications through your hiring pipeline with detailed status tracking."
          icon={<PipelineIcon />}
          link="/employer/applications"
        />
        <FeatureCard
          title="Analytics Dashboard"
          description="Get insights into your hiring process with detailed metrics and analytics."
          icon={<AnalyticsIcon />}
          link="/employer/analytics"
        />
      </div>

      {/* Feature Details */}
      <div className="mt-16 space-y-16">
        {/* Job Management Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Components</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Comprehensive job creation form</li>
                <li>Basic job details management</li>
                <li>Requirements specification</li>
                <li>Compensation details</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/employer/job-postings"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Manage Jobs
              </Link>
            </div>
          </div>
        </div>

        {/* Candidate Pipeline Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Candidate Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Application tracking system</li>
                <li>Status management</li>
                <li>Application timeline view</li>
                <li>Candidate progress tracking</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/employer/applications"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Pipeline
              </Link>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Insights</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Application metrics</li>
                <li>Response rate analytics</li>
                <li>Timeline visualization</li>
                <li>Performance tracking</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/employer/analytics"
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
        <EmployerPreview />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Link
            to="/employer/job-postings"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {translate('features.tryDemo')}
          </Link>
          <Link
            to="/employer/analytics"
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

export default EmployerFeatures;
