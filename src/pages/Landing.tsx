
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Users, BarChart, BookOpen, TrendingUp } from "lucide-react";
import { Logo } from "../components/branding/Logo";

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo className="h-48 w-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="/auth/register"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Find and hire top talent</span>
              <span className="block text-indigo-600">faster than ever</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your hiring process with our advanced talent management
              platform. Connect with qualified candidates and build your dream
              team efficiently.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/auth/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
          </div>

          {/* For Candidates Section */}
          <div className="mt-12 lg:text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              For Candidates
            </h3>
            <p className="mt-2 text-lg text-gray-600">
              Tools to advance your career and find the perfect opportunity
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/jobs" className="group hover:shadow-lg transition-shadow duration-200 rounded-lg">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600">
                      <Briefcase className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                      Browse Jobs
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Explore available positions and career opportunities
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/resources" className="group hover:shadow-lg transition-shadow duration-200 rounded-lg">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                      Learning Resources
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Access career development materials and guides
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="/success-stories" className="group hover:shadow-lg transition-shadow duration-200 rounded-lg">
              <div className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                      Success Stories
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Read about successful career transitions and placements
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* For Employers Section */}
          <div className="mt-20 lg:text-center">
            <h3 className="text-2xl font-semibold text-gray-900">
              For Employers
            </h3>
            <p className="mt-2 text-lg text-gray-600">
              Everything you need to manage talent effectively
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Link to="/jobs" className="pt-6 block transition-all duration-200">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 hover:shadow-lg transition-shadow duration-200">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-200">
                        <Briefcase className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight hover:text-indigo-600 transition-colors duration-200">
                      Job Postings
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Create and manage job postings with ease. Reach qualified
                      candidates faster.
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/employer/candidates" className="pt-6 block transition-all duration-200">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 hover:shadow-lg transition-shadow duration-200">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-200">
                        <Users className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight hover:text-indigo-600 transition-colors duration-200">
                      Candidate Management
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Track and manage candidates throughout the hiring process.
                      Stay organized and efficient.
                    </p>
                  </div>
                </div>
              </Link>

              <Link to="/employer/analytics" className="pt-6 block transition-all duration-200">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 hover:shadow-lg transition-shadow duration-200">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg group-hover:bg-indigo-600 transition-colors duration-200">
                        <BarChart className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight hover:text-indigo-600 transition-colors duration-200">
                      Analytics
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Get insights into your hiring process. Make data-driven
                      decisions.
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section with Contact Us */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-3">
                <p className="text-gray-600">Have questions? We're here to help.</p>
                <p className="text-gray-600">Email: support@talenttrack.com</p>
                <p className="text-gray-600">Phone: (555) 123-4567</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/jobs" className="text-gray-600 hover:text-indigo-600">Browse Jobs</Link></li>
                <li><Link to="/resources" className="text-gray-600 hover:text-indigo-600">Resources</Link></li>
                <li><Link to="/success-stories" className="text-gray-600 hover:text-indigo-600">Success Stories</Link></li>
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Employers</h3>
              <ul className="space-y-2">
                <li><Link to="/employer/job-postings" className="text-gray-600 hover:text-indigo-600">Post a Job</Link></li>
                <li><Link to="/employer/candidate-management" className="text-gray-600 hover:text-indigo-600">Talent Search</Link></li>
                <li><Link to="/employer/analytics" className="text-gray-600 hover:text-indigo-600">Hiring Analytics</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-600 hover:text-indigo-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-indigo-600">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} TalentTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
