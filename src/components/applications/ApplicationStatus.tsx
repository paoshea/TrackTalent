import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  Users,
  Calendar,
  MessageCircle,
} from "lucide-react";
import type { ApplicationStatus as Status } from "../../types/applications";
import type { LucideIcon } from "lucide-react";

interface StatusConfig {
  icon: LucideIcon;
  color: string;
  bg: string;
}

const statusConfig: Record<Status, StatusConfig> = {
  draft: { icon: Clock, color: "text-gray-500", bg: "bg-gray-50" },
  submitted: { icon: Send, color: "text-blue-500", bg: "bg-blue-50" },
  under_review: {
    icon: AlertCircle,
    color: "text-yellow-500",
    bg: "bg-yellow-50",
  },
  shortlisted: { icon: Users, color: "text-indigo-500", bg: "bg-indigo-50" },
  interview_scheduled: {
    icon: Calendar,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  interview_completed: {
    icon: CheckCircle,
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  offer_pending: { icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
  offer_extended: {
    icon: MessageCircle,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  offer_accepted: {
    icon: CheckCircle,
    color: "text-green-500",
    bg: "bg-green-50",
  },
  offer_declined: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  withdrawn: { icon: XCircle, color: "text-gray-500", bg: "bg-gray-50" },
  accepted: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
};

interface Props {
  status: Status;
}

export function ApplicationStatus({ status }: Props) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full ${config.bg}`}
    >
      <Icon className={`h-4 w-4 ${config.color} mr-2`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </span>
    </div>
  );
}
