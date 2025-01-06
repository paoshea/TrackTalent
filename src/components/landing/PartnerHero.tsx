import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Network, 
  Globe, 
  Users, 
  Scale,
  Target,
  BarChart2,
  TrendingUp
} from 'lucide-react';

const PartnerHero: React.FC = () => {
  return (
    <div className="relative bg-purple-600 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-purple-600 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Scale Your Network</span>
                <span className="block text-purple-200">Grow Your Impact</span>
              </h1>
              <p className="mt-3 text-base text-purple-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Build and manage large-scale talent networks with flexible resource allocation. Transform workforce development through collaborative growth.
              </p>

              {/* Network Capabilities */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Globe className="h-6 w-6 text-purple-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Global Reach</h3>
                  <p className="text-xs text-purple-100">15 countries and growing</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Scale className="h-6 w-6 text-purple-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Flexible Scaling</h3>
                  <p className="text-xs text-purple-100">Adapt to demand</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Users className="h-6 w-6 text-purple-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Active Network</h3>
                  <p className="text-xs text-purple-100">500+ mentors engaged</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <TrendingUp className="h-6 w-6 text-purple-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Growth Rate</h3>
                  <p className="text-xs text-purple-100">150% year over year</p>
                </div>
              </div>

              {/* Growth Metrics */}
              <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Network Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Network className="h-5 w-5 text-purple-200 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-white">150% Network Growth</p>
                      <p className="text-xs text-purple-100">Year over year expansion</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Target className="h-5 w-5 text-purple-200 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-white">95% Success Rate</p>
                      <p className="text-xs text-purple-100">Program completion</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 text-purple-200 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-white">85% Career Growth</p>
                      <p className="text-xs text-purple-100">Participant advancement</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <div className="rounded-md shadow">
                  <Link
                    to="/features/partner"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-600 bg-white hover:bg-purple-50 md:py-4 md:text-lg md:px-10"
                  >
                    Join Our Network
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Impact Metrics */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">65%</p>
                  <p className="text-xs text-purple-100">Income Growth</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">90%</p>
                  <p className="text-xs text-purple-100">Skill Gap Reduction</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">45%</p>
                  <p className="text-xs text-purple-100">Diversity Increase</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">85%</p>
                  <p className="text-xs text-purple-100">Career Advancement</p>
                </div>
              </div>

              {/* Program Stats */}
              <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-2">Program Impact</h3>
                <div className="text-sm text-purple-100">
                  Transforming workforce development through:
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-500/30 rounded-full text-xs text-purple-100">
                    25 Active Programs
                  </span>
                  <span className="px-2 py-1 bg-purple-500/30 rounded-full text-xs text-purple-100">
                    50+ Partner Companies
                  </span>
                  <span className="px-2 py-1 bg-purple-500/30 rounded-full text-xs text-purple-100">
                    15,000 Active Learners
                  </span>
                  <span className="px-2 py-1 bg-purple-500/30 rounded-full text-xs text-purple-100">
                    92% Satisfaction Rate
                  </span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/images/partner-hero.jpg"
          alt="Global network visualization"
        />
      </div>
    </div>
  );
};

export default PartnerHero;
