import React, { Suspense, useEffect, useCallback, useMemo } from 'react';
import {
  CandidateHero,
  EmployerHero,
  PartnerHero,
  FeaturesNav,
  Features,
} from '../components/landing';
import { useHeader } from '../contexts/HeaderContext';

interface HeaderState {
  sections: Array<{ id: string; label: string }>;
  activeSection: string;
  onSectionChange?: (sectionId: string) => void;
}

const LandingContent: React.FC = () => {
  const { activeRole, onRoleChange, setHeaderState } = useHeader();
  const sections = useMemo(() => [
    { id: 'hero', label: 'Overview' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'features', label: 'Features' },
    { id: 'metrics', label: 'Success Metrics' },
  ], []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    setHeaderState({
      sections,
      onSectionChange: scrollToSection,
      activeSection: 'hero',
    });

    // Update active section based on scroll position
    const handleScroll = () => {
      const currentPosition = window.scrollY + 100; // Offset for header

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const position = element.offsetTop;
          const height = element.offsetHeight;

          if (currentPosition >= position && currentPosition < position + height) {
            setHeaderState((prev: HeaderState) => ({
              sections: prev.sections,
              activeSection: section.id,
              onSectionChange: prev.onSectionChange,
            }));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      setHeaderState({
        sections: [],
        activeSection: '',
      });
    };
  }, [setHeaderState, scrollToSection, sections]);

  const renderHero = () => {
    switch (activeRole) {
      case 'employer':
        return <EmployerHero />;
      case 'partner':
        return <PartnerHero />;
      default:
        return <CandidateHero />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<div>Loading content...</div>}>
        <main>
          {/* Hero Section */}
          <div id="hero" className="relative min-h-screen flex items-center">
            {renderHero()}
          </div>

          {/* Transformation Section */}
          <div id="transformation" className="bg-gradient-to-b from-white to-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                Transforming Career Development
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Revolutionizing how young adults approach their careers through verified experience, proactive guidance, and data-driven growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Work Experience First */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Work Experience First</h3>
                  <p className="text-gray-600 mb-4">
                    Prioritize practical experience over traditional education paths
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>• Early career exposure</li>
                    <li>• Hands-on learning</li>
                    <li>• Industry connections</li>
                  </ul>
                </div>
                {/* Career Management */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Proactive Career Management</h3>
                  <p className="text-gray-600 mb-4">
                    Dedicated agents working for your career success
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>• Personalized guidance</li>
                    <li>• Skill development plans</li>
                    <li>• Career path optimization</li>
                  </ul>
                </div>
                {/* Verified Skills */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Verified Skills</h3>
                  <p className="text-gray-600 mb-4">
                    Independent verification of skills and experience
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>• Industry-standard validation</li>
                    <li>• Performance tracking</li>
                    <li>• Continuous assessment</li>
                  </ul>
                </div>
                {/* Network Growth */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Network Growth</h3>
                  <p className="text-gray-600 mb-4">
                    Scalable talent development ecosystem
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li>• Global partnerships</li>
                    <li>• Resource optimization</li>
                    <li>• Collaborative success</li>
                  </ul>
                </div>
              </div>
              
              {/* Impact Stats */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">65%</div>
                  <div className="text-sm text-gray-600 mt-2">Average Income Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">90%</div>
                  <div className="text-sm text-gray-600 mt-2">Skill Gap Reduction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600 mt-2">Career Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">95%</div>
                  <div className="text-sm text-gray-600 mt-2">Employer Retention</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div id="features" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FeaturesNav
                activeRole={activeRole}
                onRoleChange={onRoleChange}
              />
              <Features role={activeRole} />
            </div>
          </div>

          {/* Success Metrics Section */}
          <div id="metrics" className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                Platform Success Metrics
              </h2>
              <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
                Driving transformational outcomes across our ecosystem
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">85%</div>
                    <div className="text-gray-600">Career Satisfaction</div>
                  </div>
                  <div className="text-sm text-gray-500 space-y-2">
                    <div>• 92% skill utilization</div>
                    <div>• 88% growth opportunities</div>
                    <div>• 85% work-life balance</div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
                    <div className="text-gray-600">Employer Match Rate</div>
                  </div>
                  <div className="text-sm text-gray-500 space-y-2">
                    <div>• 95% skill verification</div>
                    <div>• 48hr average match time</div>
                    <div>• 92% long-term retention</div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                    <div className="text-gray-600">Partner Growth Rate</div>
                  </div>
                  <div className="text-sm text-gray-500 space-y-2">
                    <div>• 150% network expansion</div>
                    <div>• 15 countries reached</div>
                    <div>• 25 specializations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Suspense>
    </div>
  );
};

const Landing: React.FC = () => {
  return <LandingContent />;
};

export default Landing;
