import React from "react";
import { Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { ApplicationStatus as Status } from "../../types/applications";

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50" },
  reviewing: { icon: AlertCircle, color: "text-blue-500", bg: "bg-blue-50" },
  accepted: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  rejected: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
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
      <span className={`text-sm font-medium capitalize ${config.color}`}>
        {status}
      </span>
    </div>
  );
}
