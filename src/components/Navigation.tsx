import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "../contexts/TranslationContext";
import { LanguageToggle } from "./shared/LanguageToggle";
import type { TranslationKey } from "../contexts/TranslationContext";
import { LayoutDashboard } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon?: typeof LayoutDashboard;
  translationKey?: TranslationKey;
}

interface NavigationProps {
  className?: string;
  items: NavItem[];
  showLanguageToggle?: boolean;
}

export function Navigation({ className = "", items, showLanguageToggle = true }: NavigationProps) {
  const location = useLocation();
  const { translate } = useTranslation();

  return (
    <div className={className}>
      <nav className="space-y-1 mb-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
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
              {Icon && (
                <Icon
                  className={`
                    mr-3 flex-shrink-0 h-5 w-5
                    ${isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"}
                  `}
                />
              )}
              {item.translationKey ? translate(item.translationKey) : item.label}
            </Link>
          );
        })}
      </nav>
      {showLanguageToggle && (
        <div className="px-3">
          <LanguageToggle />
        </div>
      )}
    </div>
  );
}
