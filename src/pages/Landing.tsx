import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/TranslationContext';

const Landing: React.FC = () => {
  const { translate, language, setLanguage } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header/Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="/favicon.svg"
                  alt="TrackTalent"
                  className="h-16 w-auto"
                />
                <span className="ml-3 text-2xl font-bold text-gray-900">
                  TrackTalent
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
              >
                {language.toUpperCase()}
              </button>
              <Link
                to="/auth/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">{translate('landing.title')}</span>
              <span className="block text-indigo-600">{translate('landing.subtitle')}</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              {translate('landing.description')}
            </p>

            {/* Features Section */}
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* For Candidates */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="px-6 py-8">
                      <div className="text-center">
                        <h3 className="text-xl font-medium text-gray-900">{translate('landing.forCandidates')}</h3>
                        <p className="mt-4 text-gray-500">{translate('landing.candidateDesc')}</p>
                      </div>
                      <div className="mt-8">
                        <ul className="space-y-4">
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.jobMatching')}</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.careerTools')}</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.skillAssessments')}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-8">
                        <Link 
                          to="/features/candidate"
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Explore Candidate Features
                        </Link>
                      </div>
                  </div>
                </div>

                {/* For Employers */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="px-6 py-8">
                      <div className="text-center">
                        <h3 className="text-xl font-medium text-gray-900">{translate('landing.forEmployers')}</h3>
                        <p className="mt-4 text-gray-500">{translate('landing.employerDesc')}</p>
                      </div>
                      <div className="mt-8">
                        <ul className="space-y-4">
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.candidateSearch')}</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.applicantTracking')}</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.interviews')}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-8">
                        <Link 
                          to="/features/employer"
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Explore Employer Features
                        </Link>
                      </div>
                  </div>
                </div>

                {/* For Partners */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="px-6 py-8">
                      <div className="text-center">
                        <h3 className="text-xl font-medium text-gray-900">{translate('landing.forPartners')}</h3>
                        <p className="mt-4 text-gray-500">{translate('landing.partnerDesc')}</p>
                      </div>
                      <div className="mt-8">
                        <ul className="space-y-4">
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.clientManagement')}</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.revenueTracking')}</span>
                          </li>
                          <li className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="ml-3 text-gray-600">{translate('landing.features.analytics')}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="mt-8">
                        <Link 
                          to="/features/partner"
                          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                          Explore Partner Features
                        </Link>
                      </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
              <p className="text-base text-gray-600">
                Ready to see more?{' '}
                <Link to="/features" className="text-indigo-600 hover:text-indigo-500">
                  Explore all features
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
