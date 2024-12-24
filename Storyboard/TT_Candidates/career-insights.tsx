import React from 'react';
import { TrendingUp, BookOpen, Users, Briefcase } from 'lucide-react';

const CareerInsights = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Career Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-indigo-600 mr-2" />
                <h3 className="font-medium text-gray-900">Market Demand</h3>
              </div>
              <p className="text-sm text-gray-600">Your skills match 85% of current job openings</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-medium text-gray-900">Learning Path</h3>
              </div>
              <p className="text-sm text-gray-600">3 recommended courses to boost your profile</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-gray-900">Network Growth</h3>
              </div>
              <p className="text-sm text-gray-600">Connected with 12 industry professionals</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Briefcase className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-gray-900">Job Matches</h3>
              </div>
              <p className="text-sm text-gray-600">15 new positions match your profile</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Next Steps</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                1
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">Complete Advanced React Course</h4>
              <p className="text-sm text-gray-500">Boost your frontend development skills</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                2
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">Update Portfolio</h4>
              <p className="text-sm text-gray-500">Add your recent project achievements</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                3
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">Connect with Industry Leaders</h4>
              <p className="text-sm text-gray-500">Expand your professional network</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerInsights;