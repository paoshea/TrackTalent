import { XCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`mt-2 flex items-center text-sm text-red-600 ${className}`}
      role="alert"
    >
      <XCircle className="h-4 w-4 mr-1.5 flex-shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
