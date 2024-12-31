import { Outlet } from "react-router-dom";
import { Navigation } from "../Navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  BarChart, 
  MessageSquare 
} from "lucide-react";

export function EmployerLayout() {
  const navItems = [
    { href: "/employer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/employer/job-postings", label: "Job Postings", icon: Briefcase },
    { href: "/employer/candidate-management", label: "Candidates", icon: Users },
    { href: "/employer/analytics", label: "Analytics", icon: BarChart },
    { href: "/employer/messages", label: "Messages", icon: MessageSquare },
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
