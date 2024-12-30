
import React, { useState } from 'react';
import { Users, Filter, Search, MapPin, Briefcase, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_CANDIDATES = [
  {
    id: 1,
    name: 'Sarah Wilson',
    role: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    experience: '8 years',
    status: 'Interview',
    matchScore: 92,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Full Stack Engineer',
    location: 'New York, NY',
    experience: '5 years',
    status: 'Screening',
    matchScore: 88,
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'UI/UX Designer',
    location: 'Austin, TX',
    experience: '6 years',
    status: 'Offer',
    matchScore: 95,
  },
];

export default function CandidateManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-4">
        <Link to="/" className="text-indigo-600 hover:text-indigo-500">
          ← Back to Home
        </Link>
      </div>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Candidate Management</h1>
        <p className="text-lg text-gray-600">Track and manage candidates throughout the hiring process</p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-lg">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-lg transition-shadow duration-200"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
              <ChevronDown className={`ml-2 h-4 w-4 transform transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          {MOCK_CANDIDATES.length > 0 ? (
            <div className="space-y-4">
              {MOCK_CANDIDATES.map((candidate) => (
                <div key={candidate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {candidate.role}
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        {candidate.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${candidate.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                          candidate.status === 'Screening' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'}`}>
                        {candidate.status}
                      </span>
                      <div className="mt-2 flex items-center justify-end">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{candidate.matchScore}% match</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-lg">No candidates found</p>
              <p className="mt-2">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
