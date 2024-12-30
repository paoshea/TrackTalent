
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/branding/Logo';
import { Award, Briefcase, TrendingUp, User } from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  previousRole: string;
  newRole: string;
  company: string;
  salaryIncrease: string;
  timeToTransition: string;
  story: string;
}

export default function SuccessStories() {
  const navigate = useNavigate();
  const stories: SuccessStory[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      previousRole: 'Marketing Coordinator',
      newRole: 'Product Manager',
      company: 'TechCorp',
      salaryIncrease: '45%',
      timeToTransition: '8 months',
      story: 'Through targeted skill development and mentorship, I successfully transitioned into product management.'
    },
    {
      id: '2',
      name: 'Michael Rodriguez',
      previousRole: 'Sales Representative',
      newRole: 'Technical Account Manager',
      company: 'CloudSolutions',
      salaryIncrease: '35%',
      timeToTransition: '6 months',
      story: 'The structured learning path and certification programs helped me bridge the technical knowledge gap.'
    },
    {
      id: '3',
      name: 'Emma Thompson',
      previousRole: 'Teacher',
      newRole: 'UX Designer',
      company: 'DesignHub',
      salaryIncrease: '50%',
      timeToTransition: '12 months',
      story: 'Leveraging my teaching background and new design skills, I found my perfect role in UX.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back
      </button>
      <div className="text-center mb-12">
        <Logo className="h-48 w-auto mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h1>
        <p className="text-lg text-gray-600">
          Real stories of successful career transitions from our community
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{story.name}</h3>
                  <p className="text-sm text-gray-500">{story.company}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {story.previousRole} → {story.newRole}
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-green-600">
                    {story.salaryIncrease} salary increase
                  </span>
                </div>

                <div className="flex items-center text-sm">
                  <Award className="h-5 w-5 text-indigo-400 mr-2" />
                  <span className="text-gray-600">
                    {story.timeToTransition} transition time
                  </span>
                </div>

                <p className="text-gray-600 mt-4">{story.story}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
