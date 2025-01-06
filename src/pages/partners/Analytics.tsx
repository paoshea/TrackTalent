import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/branding/Logo";
import { mockPartnerStats } from "../../services/mockData";

export default function Analytics() {
  const navigate = useNavigate();
  const stats = mockPartnerStats;

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
        <h1 className="text-3xl font-bold text-center mb-12">Partner Analytics</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Placements</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.analytics.placements.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Average Salary Increase</h3>
            <p className="text-3xl font-bold text-green-600">{stats.analytics.placements.averageSalaryIncrease}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Satisfaction Rate</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.mentorship.effectiveness.satisfactionRate}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Top Skills in Demand</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.analytics.skills.top.map((skill, index) => (
              <div 
                key={index}
                className="bg-blue-50 rounded-lg p-3 text-center"
              >
                <span className="text-blue-700 font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-4">Why Partner With Us?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">Access to a diverse pool of pre-vetted talent</p>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">Comprehensive skill assessment and matching</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">Ongoing support and success tracking</p>
              </div>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-green-500 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-600">Data-driven insights and reporting</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
