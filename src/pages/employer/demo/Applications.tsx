// import React from 'react';
import { Filter, Search, Star, Clock, CheckCircle, XCircle, MessageCircle } from 'lucide-react';

const applications = [
  {
    id: 1,
    candidate: {
      name: 'John Smith',
      email: 'john.smith@example.com',
      avatar: '/images/avatars/john.jpg',
    },
    job: {
      title: 'Senior Software Engineer',
      department: 'Engineering',
    },
    status: 'In Review',
    appliedDate: '2024-01-15',
    lastActivity: '2024-01-16',
    matchScore: 92,
    skills: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: 2,
    candidate: {
      name: 'Emily Brown',
      email: 'emily.brown@example.com',
      avatar: '/images/avatars/emily.jpg',
    },
    job: {
      title: 'Product Manager',
      department: 'Product',
    },
    status: 'Interviewing',
    appliedDate: '2024-01-14',
    lastActivity: '2024-01-16',
    matchScore: 88,
    skills: ['Product Strategy', 'Agile', 'User Research'],
  },
  {
    id: 3,
    candidate: {
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      avatar: '/images/avatars/michael.jpg',
    },
    job: {
      title: 'UX Designer',
      department: 'Design',
    },
    status: 'New',
    appliedDate: '2024-01-16',
    lastActivity: '2024-01-16',
    matchScore: 85,
    skills: ['Figma', 'UI Design', 'User Testing'],
  },
  {
    id: 4,
    candidate: {
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      avatar: '/images/avatars/sarah.jpg',
    },
    job: {
      title: 'Senior Software Engineer',
      department: 'Engineering',
    },
    status: 'Rejected',
    appliedDate: '2024-01-13',
    lastActivity: '2024-01-15',
    matchScore: 75,
    skills: ['Java', 'Spring', 'SQL'],
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'New':
      return <Clock className="h-5 w-5 text-blue-500" />;
    case 'In Review':
      return <Star className="h-5 w-5 text-yellow-500" />;
    case 'Interviewing':
      return <MessageCircle className="h-5 w-5 text-green-500" />;
    case 'Rejected':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'Hired':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-800';
    case 'In Review':
      return 'bg-yellow-100 text-yellow-800';
    case 'Interviewing':
      return 'bg-green-100 text-green-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    case 'Hired':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function Applications() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
            <p className="mt-1 text-sm text-gray-500">
              Review and manage candidate applications.
            </p>
          </div>
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
                placeholder="Search applications..."
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

        {/* Applications List */}
        <div className="mt-8 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Match Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applications.map((application) => (
                      <tr key={application.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 font-medium text-sm">
                                  {application.candidate.name.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {application.candidate.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {application.candidate.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{application.job.title}</div>
                          <div className="text-sm text-gray-500">{application.job.department}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(application.status)}
                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                              {application.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm text-gray-900">{application.matchScore}%</div>
                            <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 rounded-full h-2"
                                style={{ width: `${application.matchScore}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {application.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Review
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
