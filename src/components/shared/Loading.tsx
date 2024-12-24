import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  text?: string;
}

const sizes = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

const textSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Loading({
  size = "md",
  fullScreen = false,
  text,
}: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className={`animate-spin text-blue-500 ${sizes[size]}`} />
      {text && (
        <p className={`mt-2 text-gray-500 ${textSizes[size]}`}>{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
        {content}
      </div>
    );
  }

  return content;
}

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75">
      <Loading size="lg" text="Loading..." />
    </div>
  );
}

export function LoadingButton({
  loading,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      className="inline-flex items-center justify-center"
      disabled={loading}
      {...props}
    >
      {loading && <Loading size="sm" />}
      <span className={loading ? "ml-2" : ""}>{children}</span>
    </button>
  );
}
