// import React from 'react';
import { Book, Video, Users, Award } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: 'Career Development Guide',
    type: 'Guide',
    duration: '45 min read',
    category: 'Career Planning',
    description: 'A comprehensive guide to planning and advancing your tech career.',
    icon: Book,
  },
  {
    id: 2,
    title: 'Interview Preparation',
    type: 'Video Course',
    duration: '2 hours',
    category: 'Skills',
    description: 'Master technical interviews with real-world examples and practice sessions.',
    icon: Video,
  },
  {
    id: 3,
    title: 'Mentorship Program',
    type: 'Program',
    duration: '3 months',
    category: 'Mentorship',
    description: 'Connect with experienced professionals in your field for guidance and support.',
    icon: Users,
  },
  {
    id: 4,
    title: 'Skill Certification',
    type: 'Certification',
    duration: 'Self-paced',
    category: 'Certification',
    description: 'Industry-recognized certifications to validate your skills.',
    icon: Award,
  },
];

export default function Resources() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Career Resources
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Tools and resources to help you succeed in your career journey.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.id}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md transition-shadow flex items-center space-x-3"
              >
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {resource.title}
                      </p>
                      <div className="text-xs text-gray-500">
                        {resource.duration}
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-500">
                        {resource.description}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {resource.type}
                      </span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900">Need more help?</h3>
          <p className="mt-2 text-gray-500">
            Schedule a call with a career advisor to discuss your goals.
          </p>
          <button
            type="button"
            className="mt-4 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Schedule consultation
          </button>
        </div>
      </div>
    </div>
  );
}
