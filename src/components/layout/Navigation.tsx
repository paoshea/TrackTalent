import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../types/auth";
import type { LucideIcon } from "lucide-react";
import { LogOut } from "lucide-react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRole[];
}

interface NavigationProps {
  items: NavigationItem[];
}

export function Navigation({ items }: NavigationProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user || !user.role) return null;

  const baseRoute = user.role === 'employer' ? '/employer' : '/candidate';
  const filteredItems = items.filter(
    (item) => !item.roles || item.roles.includes(user.role as UserRole)
  ).map(item => ({
    ...item,
    href: item.href.startsWith('/') ? `${baseRoute}${item.href}` : `${baseRoute}/${item.href}`
  }));

  // Assume translate function is available in scope.  This would need to be added elsewhere.
  const translate = (text: string) => text; // Placeholder for actual translation logic

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth/login', { replace: true });
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav className="space-y-1">
      {filteredItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <Icon
              aria-hidden="true"
              className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
            />
            {translate(item.name)}
          </Link>
        );
      })}
      <Link
        to="/auth/signout"
        onClick={handleSignOut}
        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      >
        <LogOut
          aria-hidden="true"
          className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
        />
        Sign Out
      </Link>
    </nav>
  );
}
