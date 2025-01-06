import React from 'react';

const Help: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Help Center</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Getting Started */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  How to create an account
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Complete your profile
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Search for opportunities
                </a>
              </li>
            </ul>
          </div>

          {/* For Candidates */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">For Candidates</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Applying for jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Building your profile
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Skill assessments
                </a>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">For Employers</h2>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Posting jobs
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Managing applications
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  Using analytics
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need more help?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;
