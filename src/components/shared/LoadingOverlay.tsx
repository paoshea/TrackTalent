import { LoadingSpinner } from "./LoadingSpinner";

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export function LoadingOverlay({
  isLoading,
  children,
}: LoadingOverlayProps): JSX.Element {
  return (
    <div className="relative">
      {isLoading && (
        <div
          className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50"
          aria-busy="true"
          aria-label="Loading"
        >
          <LoadingSpinner />
        </div>
      )}
      {children}
    </div>
  );
}
