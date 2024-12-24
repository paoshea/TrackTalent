interface LoadingStateProps {
  message?: string;
  className?: string;
}

export function LoadingState({
  message = "Loading...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-4 ${className}`}
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      {message && <p className="mt-2 text-sm text-gray-500">{message}</p>}
    </div>
  );
}
