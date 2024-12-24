import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { UserRole } from "../../types/auth";
import type { LucideIcon } from "lucide-react";

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
  const { user } = useAuth();

  if (!user || !user.role) return null;

  const filteredItems = items.filter(
    (item) => !item.roles || item.roles.includes(user.role as UserRole),
  );

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
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
