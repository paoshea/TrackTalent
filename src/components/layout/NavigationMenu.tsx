import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavigationMenuProps {
  items: NavigationItem[];
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ items }) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-1 py-4">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
