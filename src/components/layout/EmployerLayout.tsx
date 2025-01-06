import { Outlet } from "react-router-dom";
import { NavigationMenu } from "./NavigationMenu";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  User,
  Briefcase,
  BarChart,
  Settings,
} from "lucide-react";

export function EmployerLayout() {
  const navItems = [
    { href: "/employer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/employer/jobs", label: "Job Postings", icon: Briefcase },
    { href: "/employer/applications", label: "Applications", icon: FileText },
    { href: "/employer/messages", label: "Messages", icon: MessageSquare },
    { href: "/employer/analytics", label: "Analytics", icon: BarChart },
    { href: "/employer/profile", label: "Company Profile", icon: User },
    { href: "/employer/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationMenu items={navItems} />
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
