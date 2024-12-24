import React from 'react';
import { BookOpen, PlayCircle, Award, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'course' | 'video' | 'certification';
  provider: string;
  duration: string;
  link: string;
}

export function LearningResources() {
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Advanced JavaScript Concepts',
      type: 'course',
      provider: 'Udemy',
      duration: '12 hours',
      link: '#'
    },
    {
      id: '2',
      title: 'System Design for Frontend Engineers',
      type: 'video',
      provider: 'Frontend Masters',
      duration: '4 hours',
      link: '#'
    },
    {
      id: '3',
      title: 'AWS Solutions Architect',
      type: 'certification',
      provider: 'Amazon',
      duration: '3 months',
      link: '#'
    }
  ];

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-5 w-5" />;
      case 'video':
        return <PlayCircle className="h-5 w-5" />;
      case 'certification':
        return <Award className="h-5 w-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Recommended Resources</h2>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div 
            key={resource.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-indigo-200"
          >
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              {getIcon(resource.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900">
                {resource.title}
              </h3>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span>{resource.provider}</span>
                <span className="mx-2">&bull;</span>
                <span>{resource.duration}</span>
              </div>
            </div>

            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              View Resource
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      <button
        className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Browse All Resources
      </button>
    </div>
  );
}