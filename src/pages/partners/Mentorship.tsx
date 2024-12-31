import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../../components/layout/Footer';

export default function Mentorship() {
  const mentors = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Software Architect',
      expertise: ['System Design', 'Cloud Architecture', 'Team Leadership'],
      availability: 'Weekly sessions'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Data Science Lead',
      expertise: ['Machine Learning', 'Big Data', 'Python'],
      availability: 'Bi-weekly sessions'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'Product Manager',
      expertise: ['Agile', 'Product Strategy', 'User Research'],
      availability: 'Monthly sessions'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <img src="/favicon.svg" alt="Logo" className="h-12 w-12 md:h-[48px] md:w-[48px]" />
        <button 
          onClick={() => window.history.back()} 
          className="ml-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Partner Mentorship</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{mentor.name}</h2>
                <p className="text-gray-600 mb-4">{mentor.role}</p>
                <div className="space-y-2">
                  <p className="font-medium">Expertise:</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise.map((skill) => (
                      <span key={skill} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4"><span className="font-medium">Availability:</span> {mentor.availability}</p>
                </div>
              </div>
            ))}
      </div>
      <footer className="mt-16 border-t pt-8">
        <p className="text-center text-gray-600">© 2024 All rights reserved.</p>
      </footer>
    </div>
  );
}