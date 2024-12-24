import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white";
  className?: string;
}

export function LoadingSpinner({
  size = "md",
  color = "primary",
  className = "",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const colorClasses = {
    primary: "text-indigo-600",
    white: "text-white",
  };

  return (
    <span
      className={`inline-flex ${className}`}
      role="status"
      aria-label="Loading"
    >
      <Loader2
        className={`
          animate-spin
          ${sizeClasses[size]}
          ${colorClasses[color]}
        `}
      />
      <span className="sr-only">Loading...</span>
    </span>
  );
}
