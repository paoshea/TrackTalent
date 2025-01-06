import React from 'react';
import { UserCircle, Building2, Network } from 'lucide-react';
import type { UserRole } from '../../types/auth';

interface FeaturesNavProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const FeaturesNav: React.FC<FeaturesNavProps> = ({ activeRole, onRoleChange }) => {
  const tabs = [
    {
      name: 'Candidates',
      role: 'candidate' as UserRole,
      icon: UserCircle,
      description: 'Find your next opportunity',
    },
    {
      name: 'Employers',
      role: 'employer' as UserRole,
      icon: Building2,
      description: 'Hire top talent',
    },
    {
      name: 'Partners',
      role: 'partner' as UserRole,
      icon: Network,
      description: 'Grow your business',
    },
  ];

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="role-select" className="sr-only">
          Select a role
        </label>
        <select
          id="role-select"
          className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          value={activeRole}
          onChange={(e) => onRoleChange(e.target.value as UserRole)}
        >
          {tabs.map((tab) => (
            <option key={tab.role} value={tab.role}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Features">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeRole === tab.role;
              return (
                <button
                  key={tab.role}
                  onClick={() => onRoleChange(tab.role)}
                  className={`
                    group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`
                      -ml-0.5 mr-2 h-5 w-5
                      ${
                        isActive
                          ? 'text-blue-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }
                    `}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-4">
          <h2 className="text-sm font-medium text-gray-500">
            {tabs.find((tab) => tab.role === activeRole)?.description}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FeaturesNav;
