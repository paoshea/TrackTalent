
import React from 'react';
import { Logo } from '../../components/branding/Logo';
import { BookOpen, PlayCircle, Award, ExternalLink } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'course' | 'video' | 'certification';
  provider: string;
  duration: string;
  link: string;
}

export default function Resources() {
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
    },
    {
      id: '4',
      title: 'React Performance Optimization',
      type: 'course',
      provider: 'Coursera',
      duration: '8 hours',
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Logo className="h-12 w-auto mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Learning Resources</h1>
        <p className="text-lg text-gray-600">
          Enhance your skills with our curated learning materials
        </p>
      </div>

      <div className="space-y-4">
        {resources.map((resource) => (
          <div 
            key={resource.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-indigo-200 bg-white"
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
    </div>
  );
}
