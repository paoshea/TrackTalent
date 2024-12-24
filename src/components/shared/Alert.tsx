import { cn } from "../../utils/cn";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  XCircle,
  type LucideIcon,
} from "lucide-react";

export interface AlertProps {
  type?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
  variant?: "default" | "outline";
  className?: string;
}

const icons: Record<AlertProps["type"] & string, LucideIcon> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertCircle,
  error: XCircle,
};

const colors: Record<AlertProps["type"] & string, string> = {
  info: "bg-blue-50 text-blue-800",
  success: "bg-green-50 text-green-800",
  warning: "bg-yellow-50 text-yellow-800",
  error: "bg-red-50 text-red-800",
};

const outlineColors: Record<AlertProps["type"] & string, string> = {
  info: "border-blue-300 text-blue-800",
  success: "border-green-300 text-green-800",
  warning: "border-yellow-300 text-yellow-800",
  error: "border-red-300 text-red-800",
};

export function Alert({
  type = "info",
  title,
  message,
  variant = "default",
  className,
}: AlertProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "rounded-lg p-4",
        variant === "default" ? colors[type] : "bg-white border",
        variant === "outline" && outlineColors[type],
        className,
      )}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={cn("text-sm", title && "mt-2")}>{message}</div>
        </div>
      </div>
    </div>
  );
}
