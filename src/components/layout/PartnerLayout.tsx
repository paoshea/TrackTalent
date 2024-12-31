import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart, 
  MessageSquare 
} from "lucide-react";

export function PartnerLayout() {
  const navItems = [
    { href: "/partner", label: "Dashboard", icon: LayoutDashboard },
    { href: "/partner/programs", label: "Programs", icon: BookOpen },
    { href: "/partner/analytics", label: "Analytics", icon: BarChart },
    { href: "/partner/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation items={navItems} />
      <main className="py-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
