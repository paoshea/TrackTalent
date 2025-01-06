import React, { Suspense, useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from '../../contexts/TranslationContext';
import { 
  Users, 
  Building, 
  Network,
  Menu,
  X,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Footer from './Footer';

interface JourneyStep {
  label: string;
  path: string;
  completed?: boolean;
}

interface RoleJourney {
  candidate: JourneyStep[];
  employer: JourneyStep[];
  partner: JourneyStep[];
}

const journeySteps: RoleJourney = {
  candidate: [
    { label: 'Features', path: '/features/candidate' },
    { label: 'Jobs', path: '/candidate/jobs' },
    { label: 'Resources', path: '/candidate/resources' },
    { label: 'Success Stories', path: '/candidate/success-stories' }
  ],
  employer: [
    { label: 'Features', path: '/features/employer' },
    { label: 'Job Postings', path: '/employer/demo/job-postings' },
    { label: 'Applications', path: '/employer/demo/applications' },
    { label: 'Analytics', path: '/employer/demo/analytics' }
  ],
  partner: [
    { label: 'Features', path: '/features/partner' },
    { label: 'Analytics', path: '/partner/demo/analytics' },
    { label: 'Apprenticeships', path: '/partner/demo/apprenticeships' },
    { label: 'Mentorship', path: '/partner/demo/mentorship' }
  ]
};

const getRoleColor = (role: 'candidate' | 'employer' | 'partner') => {
  switch (role) {
    case 'employer':
      return 'text-green-600';
    case 'partner':
      return 'text-purple-600';
    default:
      return 'text-blue-600';
  }
};

const getRoleBgColor = (role: 'candidate' | 'employer' | 'partner') => {
  switch (role) {
    case 'employer':
      return 'bg-green-600';
    case 'partner':
      return 'bg-purple-600';
    default:
      return 'bg-blue-600';
  }
};

const GuestLayout: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage } = useTranslation();
  const [activeRole, setActiveRole] = useState<'candidate' | 'employer' | 'partner'>('candidate');
  const [currentSteps, setCurrentSteps] = useState<JourneyStep[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    // Determine active role and update steps based on current path
    const path = location.pathname;
    let role: 'candidate' | 'employer' | 'partner' = 'candidate';
    
    if (path.includes('employer')) {
      role = 'employer';
    } else if (path.includes('partner')) {
      role = 'partner';
    }
    
    setActiveRole(role);
    const steps = journeySteps[role].map(step => ({
      ...step,
      completed: path === step.path || journeySteps[role].findIndex(s => s.path === step.path) < journeySteps[role].findIndex(s => s.path === path)
    }));
    setCurrentSteps(steps);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isLandingPage && (
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
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

              {/* Navigation and Actions */}
              <div className="flex items-center space-x-8">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>

                {/* Role Selection */}
                <nav className="hidden md:flex items-center space-x-6">
                  <Link
                    to="/features/candidate"
                    className={`flex items-center space-x-2 text-sm font-medium ${
                      activeRole === 'candidate' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Users className="h-5 w-5" />
                    <span>Candidate</span>
                  </Link>
                  <Link
                    to="/features/employer"
                    className={`flex items-center space-x-2 text-sm font-medium ${
                      activeRole === 'employer' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Building className="h-5 w-5" />
                    <span>Employer</span>
                  </Link>
                  <Link
                    to="/features/partner"
                    className={`flex items-center space-x-2 text-sm font-medium ${
                      activeRole === 'partner' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Network className="h-5 w-5" />
                    <span>Partner</span>
                  </Link>
                </nav>

                {/* Language and Auth */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-500 hover:text-gray-700"
                  >
                    {language.toUpperCase()}
                  </button>
                  <div className="h-4 w-px bg-gray-200" />
                  <Link
                    to="/auth/login"
                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/register"
                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${getRoleBgColor(activeRole)} hover:opacity-90`}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && !isLandingPage && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-800 bg-opacity-75">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-md text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <nav className="px-4 py-6 space-y-6">
                  {/* Role Links */}
                  <div className="space-y-4">
                    <Link
                      to="/features/candidate"
                      className={`flex items-center space-x-2 text-sm font-medium ${
                        activeRole === 'candidate' ? 'text-blue-600' : 'text-gray-500'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users className="h-5 w-5" />
                      <span>Candidate</span>
                    </Link>
                    <Link
                      to="/features/employer"
                      className={`flex items-center space-x-2 text-sm font-medium ${
                        activeRole === 'employer' ? 'text-green-600' : 'text-gray-500'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Building className="h-5 w-5" />
                      <span>Employer</span>
                    </Link>
                    <Link
                      to="/features/partner"
                      className={`flex items-center space-x-2 text-sm font-medium ${
                        activeRole === 'partner' ? 'text-purple-600' : 'text-gray-500'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Network className="h-5 w-5" />
                      <span>Partner</span>
                    </Link>
                  </div>
                  {/* Journey Steps */}
                  {currentSteps.length > 0 && (
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Your Journey
                      </h3>
                      <div className="space-y-4">
                        {currentSteps.map(step => (
                          <Link
                            key={step.path}
                            to={step.path}
                            className={`flex items-center justify-between text-sm ${
                              location.pathname === step.path
                                ? getRoleColor(activeRole)
                                : step.completed
                                ? 'text-gray-500'
                                : 'text-gray-400'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <span>{step.label}</span>
                            {step.completed && (
                              <CheckCircle2 className={`h-4 w-4 ${getRoleColor(activeRole)}`} />
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Journey Progress Bar */}
      {!isLandingPage && currentSteps.length > 0 && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                {currentSteps.map((step, index) => (
                  <React.Fragment key={step.path}>
                    {index > 0 && (
                      <ArrowRight className={`h-5 w-5 ${
                        step.completed ? getRoleColor(activeRole) : 'text-gray-300'
                      }`} />
                    )}
                    <Link
                      to={step.path}
                      className={`flex items-center space-x-2 text-sm font-medium ${
                        location.pathname === step.path
                          ? getRoleColor(activeRole)
                          : step.completed
                          ? 'text-gray-500'
                          : 'text-gray-400'
                      }`}
                    >
                      <span>{step.label}</span>
                      {step.completed && (
                        <CheckCircle2 className={`h-4 w-4 ${getRoleColor(activeRole)}`} />
                      )}
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GuestLayout;
