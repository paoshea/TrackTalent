import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from "../contexts/TranslationContext";
import { LanguageToggle } from "./shared/LanguageToggle";
import type { TranslationKey } from "../contexts/TranslationContext";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  Bell,
  Settings,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: string[];
  translationKey: TranslationKey;
}

const navigation: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "customer", "candidate"],
    translationKey: "dashboard.dashboard"
  },
  {
    name: "Jobs",
    href: "/jobs",
    icon: Briefcase,
    roles: ["admin", "customer"],
    translationKey: "dashboard.jobs"
  },
  {
    name: "Candidates",
    href: "/candidates",
    icon: Users,
    roles: ["admin", "customer"],
    translationKey: "dashboard.candidates"
  },
  {
    name: "Messages",
    href: "/messages",
    icon: MessageSquare,
    roles: ["admin", "customer", "candidate"],
    translationKey: "dashboard.messages"
  },
  {
    name: "Notifications",
    href: "/notifications",
    icon: Bell,
    roles: ["admin", "customer", "candidate"],
    translationKey: "dashboard.notifications"
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    roles: ["admin", "customer", "candidate"],
    translationKey: "dashboard.settings"
  },
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className = "" }: NavigationProps) {
  const { user } = useAuth();
  const location = useLocation();
  const { translate } = useTranslation();

  const filteredNavigation = navigation.filter((item) =>
    item.roles.includes(user?.role || ""),
  );

  return (
    <div className={className}>
      <nav className="space-y-1 mb-4">
        {filteredNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                group flex items-center px-3 py-2 text-sm font-medium rounded-md
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
              {translate(item.translationKey)}
            </Link>
          );
        })}
      </nav>
      <div className="px-3">
        <LanguageToggle />
      </div>
    </div>
  );
}
