import { useNavigate } from 'react-router-dom';
import { Logo } from '../../components/branding/Logo';
import { User, Calendar, Mail, Phone } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';

export default function CandidateManagement() {
  const navigate = useNavigate();

  const candidates = [
    {
      id: 1,
      name: 'Sarah Wilson',
      role: 'Frontend Developer',
      status: 'Interview',
      experience: '5 years',
      email: 'sarah.w@example.com',
      phone: '+1 234-567-8901'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      status: 'Screening',
      experience: '8 years',
      email: 'michael.c@example.com',
      phone: '+1 234-567-8902'
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'UX Designer',
      status: 'Offer',
      experience: '4 years',
      email: 'emma.d@example.com',
      phone: '+1 234-567-8903'
    }
  ];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
        <div className="text-center mb-12">
          <Logo className="h-48 w-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Candidate Management</h1>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {candidates.map((candidate) => (
              <li key={candidate.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-500">{candidate.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        candidate.status === 'Interview' ? 'bg-yellow-100 text-yellow-800' :
                        candidate.status === 'Screening' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {candidate.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {candidate.experience} experience
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <Mail className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {candidate.email}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <Phone className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {candidate.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
