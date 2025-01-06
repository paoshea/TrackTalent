import { Outlet } from "react-router-dom";
import { NavigationMenu } from "./NavigationMenu";
import {
  LayoutDashboard,
  Users,
  BarChart,
  Briefcase,
  Settings,
  User,
} from "lucide-react";

export function PartnerLayout() {
  const navItems = [
    { href: "/partner", label: "Dashboard", icon: LayoutDashboard },
    { href: "/partner/network", label: "Network", icon: Users },
    { href: "/partner/analytics", label: "Analytics", icon: BarChart },
    { href: "/partner/opportunities", label: "Opportunities", icon: Briefcase },
    { href: "/partner/profile", label: "Profile", icon: User },
    { href: "/partner/settings", label: "Settings", icon: Settings },
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
