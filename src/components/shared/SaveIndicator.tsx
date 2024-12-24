import { Check, Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

type SaveStatus = "saving" | "saved" | "error" | "idle";

interface SaveIndicatorProps {
  status: SaveStatus;
  errorMessage?: string;
  className?: string;
  autoHideDelay?: number;
}

const statusConfig = {
  saving: {
    icon: Loader2,
    text: "Saving...",
    className: "text-gray-500",
  },
  saved: {
    icon: Check,
    text: "Saved",
    className: "text-green-600",
  },
  error: {
    icon: XCircle,
    text: "Error saving",
    className: "text-red-600",
  },
  idle: {
    icon: null,
    text: "",
    className: "",
  },
};

export function SaveIndicator({
  status,
  errorMessage,
  className = "",
  autoHideDelay = 3000,
}: SaveIndicatorProps) {
  const [visible, setVisible] = useState(true);
  const config = statusConfig[status];

  useEffect(() => {
    setVisible(true);

    if (status === "saved") {
      const timer = setTimeout(() => {
        setVisible(false);
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [status, autoHideDelay]);

  if (!visible || status === "idle") return null;

  const Icon = config.icon;

  return (
    <div
      className={`
        inline-flex items-center space-x-2 text-sm
        ${config.className} ${className}
      `}
      role="status"
      aria-live="polite"
    >
      {Icon && (
        <Icon
          className={`h-4 w-4 ${status === "saving" ? "animate-spin" : ""}`}
          aria-hidden="true"
        />
      )}
      <span>
        {config.text}
        {status === "error" && errorMessage ? `: ${errorMessage}` : ""}
      </span>
    </div>
  );
}
