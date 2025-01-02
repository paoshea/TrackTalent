import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';
import { PartnerPreview } from '../../components/features/PartnerPreview';

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

const ClientIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </IconWrapper>
);

const RevenueIcon: React.FC = () => (
  <IconWrapper>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          title={translate('features.partner.client.title')}
          description={translate('features.partner.client.description')}
          icon={<ClientIcon />}
        />
        <FeatureCard
          title={translate('features.partner.revenue.title')}
          description={translate('features.partner.revenue.description')}
          icon={<RevenueIcon />}
        />
        <FeatureCard
          title={translate('features.partner.analytics.title')}
          description={translate('features.partner.analytics.description')}
          icon={<AnalyticsIcon />}
        />
      </div>

      {/* Preview Section */}
      <div className="mt-8">
        <PartnerPreview />
      </div>

      {/* Action Buttons */}
      <div className="mt-8 text-center space-y-4">
        <div className="flex justify-center space-x-4">
          <Link
            to="/demo/partner"
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

export default PartnerFeatures;
