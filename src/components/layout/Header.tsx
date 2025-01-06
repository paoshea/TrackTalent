import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../branding/Logo';
import { useHeader } from '../../contexts/HeaderContext';
import { 
  Users, 
  Building, 
  Network,
  Menu,
  X,
  Globe,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../contexts/TranslationContext';
import { cn } from '../../utils/cn';

interface HeaderProps {
  transparent?: boolean;
  sticky?: boolean;
  sections?: Array<{ id: string; label: string }>;
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  transparent = false,
  sticky = false,
  sections = [],
  activeSection = '',
  onSectionChange,
}) => {
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { activeRole, onRoleChange } = useHeader();

  React.useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'employer':
        return 'text-green-600';
      case 'partner':
        return 'text-purple-600';
      default:
        return 'text-blue-600';
    }
  };

  const getRoleBgColor = (role: string) => {
    switch (role) {
      case 'employer':
        return 'bg-green-600';
      case 'partner':
        return 'bg-purple-600';
      default:
        return 'bg-blue-600';
    }
  };

  // Navigation items based on user state and current page
  const renderNavItems = () => {
    if (sections && sections.length > 0) {
      return sections.map(section => (
        <button
          key={section.id}
          onClick={() => onSectionChange?.(section.id)}
          className={`
            text-base font-medium 
            ${activeSection === section.id ? 'text-blue-600' : transparent ? 'text-white' : 'text-gray-500'}
            hover:text-gray-900
          `}
        >
          {section.label}
        </button>
      ));
    }

    if (user) {
      switch (user.role) {
        case 'employer':
          return [
            { name: 'Job Postings', href: '/employer/demo/job-postings' },
            { name: 'Applications', href: '/employer/demo/applications' },
            { name: 'Analytics', href: '/employer/demo/analytics' },
          ].map(item => (
            <Link
              key={item.name}
              to={item.href}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ));
        case 'partner':
          return [
            { name: 'Analytics', href: '/partner/demo/analytics' },
            { name: 'Apprenticeships', href: '/partner/demo/apprenticeships' },
            { name: 'Mentorship', href: '/partner/demo/mentorship' },
          ].map(item => (
            <Link
              key={item.name}
              to={item.href}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ));
        default:
          return [
            { name: 'Resources', href: '/candidate/resources' },
            { name: 'Jobs', href: '/candidate/jobs' },
            { name: 'Success Stories', href: '/candidate/success-stories' },
          ].map(item => (
            <Link
              key={item.name}
              to={item.href}
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              {item.name}
            </Link>
          ));
      }
    }

    // Guest navigation
    // Guest navigation for non-landing pages
    if (sections.length === 0 && !window.location.pathname.match(/^\/$/)) {
      return [
        { name: 'About', href: '/about' },
        { name: 'Features', href: '/features/candidate' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Blog', href: '/blog' },
        { name: 'Help', href: '/help' },
      ].map(item => (
        <Link
          key={item.name}
          to={item.href}
          className="text-base font-medium text-gray-500 hover:text-gray-900"
        >
          {item.name}
        </Link>
      ));
    }

    // Landing page role selection
    return (
      <>
        <Link
          to="/features/candidate"
          className={`flex items-center space-x-2 text-sm font-medium ${
            activeRole === 'candidate' ? getRoleColor('candidate') : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onRoleChange('candidate')}
        >
          <Users className="h-5 w-5" />
          <span>Candidate</span>
        </Link>
        <Link
          to="/features/employer"
          className={`flex items-center space-x-2 text-sm font-medium ${
            activeRole === 'employer' ? getRoleColor('employer') : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onRoleChange('employer')}
        >
          <Building className="h-5 w-5" />
          <span>Employer</span>
        </Link>
        <Link
          to="/features/partner"
          className={`flex items-center space-x-2 text-sm font-medium ${
            activeRole === 'partner' ? getRoleColor('partner') : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onRoleChange('partner')}
        >
          <Network className="h-5 w-5" />
          <span>Partner</span>
        </Link>
      </>
    );
  };

  const headerClasses = cn(
    'relative z-50',
    sticky && 'sticky top-0',
    isScrolled ? 'bg-white shadow' : transparent ? 'bg-transparent' : 'bg-white',
    'transition-all duration-200'
  );

  const textClasses = isScrolled || !transparent
    ? 'text-gray-900'
    : 'text-white';

  return (
    <header className={headerClasses}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-4 flex items-center justify-between border-b border-transparent">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="h-10 w-auto" />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              {renderNavItems()}
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <button
              type="button"
              className={`${textClasses} p-2 hover:text-gray-500`}
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            >
              <Globe className="h-5 w-5" />
            </button>
            {user ? (
              <>
                {!sections?.length && (
                  <Link
                    to={`/${user.role}/dashboard`}
                    className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className={cn(
                    isScrolled || !transparent ? 'text-gray-900 border-gray-300 hover:bg-gray-50' : 'text-white border-white/30 hover:bg-white/10',
                    'inline-block py-2 px-4 border rounded-md text-base font-medium'
                  )}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/sign-in"
                  className={cn(
                    isScrolled || !transparent ? 'text-gray-900 border-gray-300 hover:bg-gray-50' : 'text-white border-white/30 hover:bg-white/10',
                    'inline-block py-2 px-4 border rounded-md text-base font-medium'
                  )}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/sign-up"
                  className={`inline-block py-2 px-4 border border-transparent rounded-md text-base font-medium text-white ${getRoleBgColor(activeRole)} hover:opacity-90`}
                >
                  Sign Up
                </Link>
              </>
            )}
            <div className="lg:hidden">
              <button
                type="button"
                className={`${textClasses} p-2 hover:text-gray-500`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            'lg:hidden',
            mobileMenuOpen ? 'block' : 'hidden',
            'absolute top-full left-0 right-0 bg-white shadow-lg'
          )}
        >
          <div className="pt-2 pb-3 px-2 space-y-1">
            {renderNavItems()}
          </div>
        </div>
      </nav>
    </header>
  );
};
