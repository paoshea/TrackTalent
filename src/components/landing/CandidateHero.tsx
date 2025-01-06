import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Briefcase, GraduationCap, Users, TrendingUp } from 'lucide-react';

const CandidateHero: React.FC = () => {
  return (
    <div className="relative bg-blue-600">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-blue-600 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 lg:pt-16 lg:px-8 xl:pt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Start Your Career</span>
                <span className="block text-blue-200">With Real Experience</span>
              </h1>
              <p className="mt-3 text-base text-blue-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Begin your professional journey with hands-on experience, dedicated career guidance, and verified skill development.
              </p>

              {/* Value Propositions */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Briefcase className="h-6 w-6 text-blue-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Work Experience First</h3>
                  <p className="text-xs text-blue-100">Start earning while learning</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="h-6 w-6 text-blue-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Career Agent</h3>
                  <p className="text-xs text-blue-100">Personal guidance & support</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <GraduationCap className="h-6 w-6 text-blue-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Verified Skills</h3>
                  <p className="text-xs text-blue-100">Industry-recognized validation</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <TrendingUp className="h-6 w-6 text-blue-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Career Growth</h3>
                  <p className="text-xs text-blue-100">Clear progression path</p>
                </div>
              </div>
              
              {/* Quick Search */}
              <div className="mt-8 sm:mt-12">
                <div className="relative rounded-md shadow-sm max-w-lg mx-auto lg:mx-0">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-4 pl-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    placeholder="Search apprenticeships, skills, or companies"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <div className="rounded-md shadow max-w-lg mx-auto lg:mx-0">
                  <Link
                    to="/features/candidate"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10"
                  >
                    Explore Opportunities
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Success Stories Preview */}
              <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-4 max-w-lg mx-auto lg:mx-0">
                <h3 className="text-sm font-semibold text-white mb-2">Success Story</h3>
                <blockquote className="text-blue-100 text-sm italic">
                  &ldquo;Started as an apprentice, now leading development teams. Best decision I ever made.&rdquo;
                </blockquote>
                <p className="text-xs text-blue-200 mt-2">
                  Sarah J. - Tech Lead at TechCorp
                </p>
              </div>

              {/* Success Metrics */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">65%</p>
                  <p className="text-xs text-blue-100">Average Income Increase</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">90%</p>
                  <p className="text-xs text-blue-100">Skill Match Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">85%</p>
                  <p className="text-xs text-blue-100">Career Satisfaction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">95%</p>
                  <p className="text-xs text-blue-100">Retention Rate</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-blue-700 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div className="text-blue-200 text-center px-4">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg">Professional Development</p>
            <p className="text-sm mt-2">Connecting talent with opportunities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateHero;
