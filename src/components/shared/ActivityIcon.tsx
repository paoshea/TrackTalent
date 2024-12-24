import React from "react";
import {
  MessageSquare,
  Calendar,
  FileText,
  Bell,
  Briefcase,
  Users,
} from "lucide-react";
import type { ActivityType } from "../../types/activity";

export function getActivityIcon(type: ActivityType): React.ReactNode {
  switch (type) {
    case "message_received":
      return <MessageSquare className="h-5 w-5 text-blue-500" />;
    case "interview_scheduled":
      return <Calendar className="h-5 w-5 text-green-500" />;
    case "application_submitted":
      return <FileText className="h-5 w-5 text-purple-500" />;
    case "status_updated":
      return <Bell className="h-5 w-5 text-yellow-500" />;
    case "job_posted":
      return <Briefcase className="h-5 w-5 text-indigo-500" />;
    case "candidate_shortlisted":
      return <Users className="h-5 w-5 text-pink-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
}
