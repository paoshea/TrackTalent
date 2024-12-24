import { AlertCircle, CheckCircle } from "lucide-react";

interface ValidationMessageProps {
  message: string;
  type: "success" | "error" | "warning";
  className?: string;
}

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
};

const colorMap = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
};

export function ValidationMessage({
  message,
  type,
  className = "",
}: ValidationMessageProps) {
  if (!message) return null;

  const Icon = iconMap[type];
  const colorClass = colorMap[type];

  return (
    <div
      className={`mt-2 flex items-center text-sm ${colorClass} ${className}`}
      role="alert"
    >
      <Icon className="h-4 w-4 mr-1.5 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
