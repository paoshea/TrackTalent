// import React from 'react';
import { Search, MapPin, Building2, DollarSign, Filter } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Junior Software Developer',
    company: 'TechStart Inc.',
    location: 'San Francisco, CA',
    salary: '$70,000 - $90,000',
    type: 'Full-time',
    experience: 'Entry Level',
    skills: ['JavaScript', 'React', 'Node.js'],
    description: 'Join our growing team as a junior developer. Great opportunity for recent bootcamp graduates.',
  },
  {
    id: 2,
    title: 'Data Analyst Apprentice',
    company: 'DataCorp',
    location: 'Remote',
    salary: '$55,000 - $65,000',
    type: 'Apprenticeship',
    experience: 'Entry Level',
    skills: ['SQL', 'Python', 'Data Visualization'],
    description: 'Learn data analysis while working on real projects with experienced mentors.',
  },
  {
    id: 3,
    title: 'UX Design Intern',
    company: 'Creative Solutions',
    location: 'New York, NY',
    salary: '$45,000 - $55,000',
    type: 'Internship',
    experience: 'Entry Level',
    skills: ['Figma', 'User Research', 'Prototyping'],
    description: 'Gain hands-on experience in UX design with a leading creative agency.',
  },
  {
    id: 4,
    title: 'Cloud Engineering Trainee',
    company: 'CloudTech',
    location: 'Austin, TX',
    salary: '$65,000 - $80,000',
    type: 'Training Program',
    experience: 'Entry Level',
    skills: ['AWS', 'Linux', 'DevOps'],
    description: 'Start your cloud engineering career with our comprehensive training program.',
  },
];

export default function Jobs() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search jobs by title, skill, or company"
                />
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Filter className="h-5 w-5 mr-2 text-gray-400" />
                Filters
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-sm rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {job.type}
                  </span>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <div className="flex items-center text-sm text-gray-500">
                      <Building2 className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {job.company}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {job.location}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      <DollarSign className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      {job.salary}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{job.description}</p>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Apply now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
