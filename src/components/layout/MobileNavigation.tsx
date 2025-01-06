import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const userData = user.user_metadata;
  const name = userData.full_name;
  const avatarUrl = userData.avatar_url || '/images/default-avatar.png';

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
            <img
              className="h-8 w-8 rounded-full"
              src={avatarUrl}
              alt={name}
            />
            <span className="ml-3 text-xl font-semibold text-gray-900">
              {name}
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
