import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../branding/Logo';

interface Section {
  id: string;
  label: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface HeaderProps {
  transparent?: boolean;
  sticky?: boolean;
  sections?: Section[];
  activeSection?: string;
  onSectionChange?: (sectionId: string) => void;
}

interface NavItem {
  name: string;
  href: string;
  id?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  transparent = false, 
  sticky = false,
  sections = [],
  activeSection = '',
  onSectionChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (!sticky) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);

  const navigation: NavItem[] = sections.length > 0 
    ? sections.map(section => ({
        name: section.label,
        href: `#${section.id}`,
        id: section.id,
      }))
    : user ? (
        user.role === 'employer' ? [
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
        ]
      ) : [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
      ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    if (onSectionChange && id) {
      e.preventDefault();
      onSectionChange(id);
    }
  };

  const headerClasses = `
    relative z-50 ${sticky ? 'sticky top-0' : ''}
    ${isScrolled ? 'bg-white shadow' : transparent ? 'bg-transparent' : 'bg-white'}
    transition-all duration-200
  `;

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
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`
                    ${textClasses} 
                    text-base font-medium 
                    hover:text-gray-500
                    ${activeSection === link.id ? 'border-b-2 border-blue-600' : ''}
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4 flex items-center">
            <button
              type="button"
              className={`${textClasses} p-2 hover:text-gray-500`}
              aria-label="Change language"
            >
              <Globe className="h-5 w-5" />
            </button>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className={`
                    ${isScrolled || !transparent ? 'text-gray-900 border-gray-300 hover:bg-gray-50' : 'text-white border-white/30 hover:bg-white/10'}
                    inline-block py-2 px-4 border rounded-md text-base font-medium
                  `}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/sign-in"
                  className={`
                    ${isScrolled || !transparent ? 'text-gray-900 border-gray-300 hover:bg-gray-50' : 'text-white border-white/30 hover:bg-white/10'}
                    inline-block py-2 px-4 border rounded-md text-base font-medium
                  `}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/sign-up"
                  className="inline-block bg-blue-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
            <div className="lg:hidden">
              <button
                type="button"
                className={`${textClasses} p-2 hover:text-gray-500`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open menu</span>
                {isMenuOpen ? (
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
          className={`
            lg:hidden
            ${isMenuOpen ? 'block' : 'hidden'}
            absolute top-full left-0 right-0 bg-white shadow-lg
          `}
        >
          <div className="pt-2 pb-3 px-2 space-y-1">
            {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`
                    block px-3 py-2 rounded-md text-base font-medium 
                    ${activeSection === link.id ? 'bg-blue-50 text-blue-600' : 'text-gray-900 hover:bg-gray-50'}
                  `}
                  onClick={(e) => {
                    handleNavClick(e, link.id);
                    setIsMenuOpen(false);
                  }}
                >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
