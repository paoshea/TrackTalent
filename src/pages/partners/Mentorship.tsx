
import React from 'react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentorship Network</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
}
