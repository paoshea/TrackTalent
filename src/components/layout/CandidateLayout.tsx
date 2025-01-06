import { Outlet } from "react-router-dom";
import { NavigationMenu } from "./NavigationMenu";
import { LayoutDashboard, FileText, MessageSquare, User } from "lucide-react";

export function CandidateLayout() {
  const navItems = [
    { href: "/candidate", label: "Dashboard", icon: LayoutDashboard },
    { href: "/candidate/applications", label: "Applications", icon: FileText },
    { href: "/candidate/messages", label: "Messages", icon: MessageSquare },
    { href: "/candidate/profile", label: "Profile", icon: User },
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
