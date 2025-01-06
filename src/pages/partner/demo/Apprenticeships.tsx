// import React from 'react';
import { Plus, Users, Clock, Building, Search, Filter } from 'lucide-react';

const programs = [
  {
    id: 1,
    name: 'Full Stack Development',
    type: 'Technical',
    duration: '6 months',
    enrolledLearners: 45,
    startDate: '2024-02-01',
    status: 'Active',
    skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
    partners: ['TechCorp', 'InnovateTech'],
  },
  {
    id: 2,
    name: 'Data Science Fundamentals',
    type: 'Technical',
    duration: '4 months',
    enrolledLearners: 32,
    startDate: '2024-02-15',
    status: 'Enrolling',
    skills: ['Python', 'SQL', 'Data Analysis', 'Machine Learning'],
    partners: ['DataCorp', 'AnalyticsPro'],
  },
  {
    id: 3,
    name: 'UX Design Bootcamp',
    type: 'Creative',
    duration: '3 months',
    enrolledLearners: 28,
    startDate: '2024-03-01',
    status: 'Draft',
    skills: ['UI Design', 'User Research', 'Prototyping', 'Figma'],
    partners: ['DesignStudio', 'CreativeLabs'],
  },
  {
    id: 4,
    name: 'Cloud Engineering',
    type: 'Technical',
    duration: '5 months',
    enrolledLearners: 38,
    startDate: '2024-01-15',
    status: 'Active',
    skills: ['AWS', 'DevOps', 'Docker', 'Kubernetes'],
    partners: ['CloudTech', 'InfraPro'],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Enrolling':
      return 'bg-blue-100 text-blue-800';
    case 'Draft':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function Apprenticeships() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Apprenticeship Programs</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your training programs and track learner progress.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Program
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0 max-w-lg">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search programs..."
              />
            </div>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2 text-gray-400" />
              Filters
            </button>
          </div>
        </div>

        {/* Programs List */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Program
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Skills
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Partners
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {programs.map((program) => (
                      <tr key={program.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{program.name}</div>
                          <div className="text-sm text-gray-500">{program.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {program.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {program.enrolledLearners} learners
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {program.skills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {program.partners.map((partner) => (
                              <span
                                key={partner}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                <Building className="mr-1 h-3 w-3" />
                                {partner}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(program.status)}`}>
                            {program.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
