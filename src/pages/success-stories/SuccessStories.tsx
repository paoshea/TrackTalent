import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/branding/Logo";
import { mockSuccessStories } from "../../services/mockData";

export default function SuccessStories() {
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold text-center mb-12">Success Stories</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {mockSuccessStories.map((story) => (
            <div 
              key={story.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-semibold"
                  >
                    {story.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{story.name}</h3>
                    <p className="text-gray-600">{story.company}</p>
                  </div>
                </div>
                <h4 className="text-lg font-medium mb-3 text-blue-600">{story.title}</h4>
                <p className="text-gray-600 mb-4">{story.story}</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-700 font-medium">Key Achievements:</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-green-600 flex items-center">
                      <span className="w-32">Salary Growth:</span>
                      <span className="font-medium">{story.outcome.salaryIncrease}</span>
                    </p>
                    <p className="text-green-600 flex items-center">
                      <span className="w-32">Time to Promotion:</span>
                      <span className="font-medium">{story.outcome.timeToPromotion}</span>
                    </p>
                    <p className="text-green-600">
                      <span className="font-medium">Certifications:</span>
                      <span className="ml-2">{story.outcome.certifications.join(', ')}</span>
                    </p>
                    <p className="text-green-600">
                      <span className="font-medium">Current Role:</span>
                      <span className="ml-2">{story.outcome.mentorship}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
