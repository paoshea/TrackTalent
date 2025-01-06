import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/branding/Logo";
import { mockPartnerStats } from "../../services/mockData";

export default function Mentorship() {
  const navigate = useNavigate();
  const stats = mockPartnerStats.mentorship;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <Logo className="h-48 w-auto mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-center mb-12">Mentorship Program</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Active Mentors</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.network.activeMentors}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Mentorship Hours</h3>
            <p className="text-3xl font-bold text-green-600">{stats.network.mentorshipHours}+</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Success Rate</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.effectiveness.satisfactionRate}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Top Industries</h3>
            <div className="grid grid-cols-2 gap-4">
              {stats.industries.primary.map((industry, index) => (
                <div 
                  key={index}
                  className="bg-blue-50 rounded-lg p-3 text-center"
                >
                  <span className="text-blue-700 font-medium">{industry}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Mentorship Benefits</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">1-on-1 guidance from industry experts</p>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">Career advancement ({stats.effectiveness.careerAdvancement} success rate)</p>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">Network growth ({stats.effectiveness.networkGrowth} expansion)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-blue-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Become a Mentor</h3>
            <p className="text-blue-700 mb-6">Share your expertise and help shape the next generation of tech talent</p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Apply as Mentor
            </button>
          </div>

          <div className="bg-green-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Find a Mentor</h3>
            <p className="text-green-700 mb-6">Get guidance from experienced professionals in your field</p>
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
              Find Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
