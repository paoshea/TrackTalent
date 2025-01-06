import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const navigation = user.role === 'employer' ? [
    { name: 'Job Postings', href: '/employer/demo/job-postings' },
    { name: 'Applications', href: '/employer/demo/applications' },
    { name: 'Analytics', href: '/employer/demo/analytics' },
  ] : user.role === 'partner' ? [
    { name: 'Analytics', href: '/partner/demo/analytics' },
    { name: 'Apprenticeships', href: '/partner/demo/apprenticeships' },
    { name: 'Mentorship', href: '/partner/demo/mentorship' },
  ] : [
    { name: 'Resources', href: '/candidate/resources' },
    { name: 'Jobs', href: '/candidate/jobs' },
    { name: 'Success Stories', href: '/candidate/success-stories' },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="h-full flex flex-col">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <span className="text-xl font-semibold text-gray-900">
              {user.user_metadata.full_name}
            </span>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
