import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';

const Features: React.FC = () => {
  const { translate } = useTranslation();

  return (
    <>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            {translate('features.title')}
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            {translate('features.description')}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Candidate Features */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {translate('landing.forCandidates')}
              </h3>
              <p className="mt-4 text-gray-600">
                {translate('landing.candidateDesc')}
              </p>
              <div className="mt-8">
                <Link
                  to="/features/candidate"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {translate('features.learnMore')}
                </Link>
              </div>
            </div>
          </div>

          {/* Employer Features */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {translate('landing.forEmployers')}
              </h3>
              <p className="mt-4 text-gray-600">
                {translate('landing.employerDesc')}
              </p>
              <div className="mt-8">
                <Link
                  to="/features/employer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {translate('features.learnMore')}
                </Link>
              </div>
            </div>
          </div>

          {/* Partner Features */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-bold text-gray-900">
                {translate('landing.forPartners')}
              </h3>
              <p className="mt-4 text-gray-600">
                {translate('landing.partnerDesc')}
              </p>
              <div className="mt-8">
                <Link
                  to="/features/partner"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  {translate('features.learnMore')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/auth/register"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {translate('nav.signup')}
          </Link>
        </div>
    </>
  );
};

export default Features;
