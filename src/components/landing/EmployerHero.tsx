import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Shield, 
  Users, 
  Clock, 
  Target,
  CheckCircle2,
  TrendingUp,
  Star
} from 'lucide-react';

const EmployerHero: React.FC = () => {
  return (
    <div className="relative bg-green-600 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-green-600 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Verified Talent</span>
                <span className="block text-green-200">Quality Assured</span>
              </h1>
              <p className="mt-3 text-base text-green-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Access pre-verified talent with independently validated skills and experience. Transform your recruitment with our comprehensive verification system.
              </p>

              {/* Verification Benefits */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Shield className="h-6 w-6 text-green-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Verified Skills</h3>
                  <p className="text-xs text-green-100">Independent validation</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Clock className="h-6 w-6 text-green-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Fast Hiring</h3>
                  <p className="text-xs text-green-100">48hr average match time</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <Target className="h-6 w-6 text-green-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">Perfect Match</h3>
                  <p className="text-xs text-green-100">92% skill match rate</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <TrendingUp className="h-6 w-6 text-green-200 mb-2" />
                  <h3 className="text-sm font-semibold text-white">High Retention</h3>
                  <p className="text-xs text-green-100">95% retention rate</p>
                </div>
              </div>

              {/* Verification Process */}
              <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-sm font-semibold text-white mb-4">Verification Process</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-green-200 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-white">Skills Assessment</p>
                      <p className="text-xs text-green-100">Industry-standard validation</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-green-200 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-white">Experience Verification</p>
                      <p className="text-xs text-green-100">Work history validation</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-green-200 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-white">Performance Tracking</p>
                      <p className="text-xs text-green-100">Continuous assessment</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12">
                <div className="rounded-md shadow">
                  <Link
                    to="/features/employer"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 md:py-4 md:text-lg md:px-10"
                  >
                    Transform Your Hiring
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              {/* Success Metrics */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">100%</p>
                  <p className="text-xs text-green-100">Skills Verified</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">48hr</p>
                  <p className="text-xs text-green-100">Avg. Match Time</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">92%</p>
                  <p className="text-xs text-green-100">Skill Match Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">95%</p>
                  <p className="text-xs text-green-100">Retention Rate</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/images/employer-hero.jpg"
          alt="Team reviewing verified candidate profiles"
        />
      </div>
    </div>
  );
};

export default EmployerHero;
