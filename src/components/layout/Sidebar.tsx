import { useAuth } from "../../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface NavItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: string[];
}

const navigation: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "customer", "candidate"],
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: Briefcase,
    roles: ["admin", "customer"],
  },
  {
    name: "Candidates",
    href: "/candidates",
    icon: Users,
    roles: ["admin", "customer"],
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
    roles: ["admin", "customer", "candidate"],
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    roles: ["admin", "customer", "candidate"],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "customer", "candidate"],
  },
];

interface UserProfile extends User {
  role: string;
  firstName: string;
  lastName: string;
}

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className = "" }: SidebarProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const userProfile = user as UserProfile;

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(userProfile?.role || ""),
  );

  const getFullName = (user: UserProfile) => {
    return `${user.firstName} ${user.lastName}`;
  };

  return (
    <div className={`flex flex-col h-full bg-white border-r ${className}`}>
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-8 w-auto" src="/logo.svg" alt="TalentTrack" />
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon
                  className={`
                    mr-3 flex-shrink-0 h-5 w-5
                    ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"}
                  `}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t p-4">
        <div className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div>
              <img
                className="inline-block h-9 w-9 rounded-full"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(getFullName(userProfile))}&background=random`}
                alt={getFullName(userProfile)}
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">
                {getFullName(userProfile)}
              </p>
              <p className="text-xs font-medium text-gray-500">
                {userProfile?.role?.charAt(0).toUpperCase() +
                  userProfile?.role?.slice(1)}
              </p>
            </div>
            <button
              onClick={() => signOut()}
              className="ml-auto flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5 text-gray-400" />
              <span className="sr-only">Sign out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
