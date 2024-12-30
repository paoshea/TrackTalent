
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../../components/layout/Footer';

export default function Apprenticeships() {
  const programs = [
    {
      id: 1,
      title: 'Software Engineering',
      duration: '12 months',
      slots: 25,
      companies: ['Tech Corp', 'Innovation Labs', 'Digital Solutions'],
      description: 'Full-stack development program with industry mentors'
    },
    {
      id: 2,
      title: 'Data Science',
      duration: '9 months',
      slots: 15,
      companies: ['Data Analytics Co', 'AI Solutions', 'Tech Innovators'],
      description: 'Comprehensive data science and ML engineering program'
    },
    {
      id: 3,
      title: 'Cloud Engineering',
      duration: '6 months',
      slots: 20,
      companies: ['Cloud Tech', 'ServerPro', 'Infrastructure Inc'],
      description: 'Cloud infrastructure and DevOps practices'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center justify-between mb-8">
            <img src="/logo.svg" alt="Logo" className="h-12 w-12" />
            <h1 className="text-3xl font-bold text-gray-900">Apprenticeship Programs</h1>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{program.title}</h2>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="space-y-2">
                  <p><span className="font-medium">Duration:</span> {program.duration}</p>
                  <p><span className="font-medium">Available Slots:</span> {program.slots}</p>
                  <p><span className="font-medium">Partner Companies:</span></p>
                  <ul className="list-disc list-inside pl-2">
                    {program.companies.map((company) => (
                      <li key={company} className="text-gray-600">{company}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
