import { cn } from "../../utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "error" | "warning" | "info";
  className?: string;
}

export function Badge({ children, variant = "info", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-green-100 text-green-800": variant === "success",
          "bg-red-100 text-red-800": variant === "error",
          "bg-yellow-100 text-yellow-800": variant === "warning",
          "bg-blue-100 text-blue-800": variant === "info",
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
