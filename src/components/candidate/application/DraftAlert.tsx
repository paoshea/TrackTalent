import { AlertTriangle } from "lucide-react";

interface DraftAlertProps {
  onResume: () => void;
  onDiscard: () => void;
}

export function DraftAlert({ onResume, onDiscard }: DraftAlertProps) {
  return (
    <div
      className="rounded-md bg-yellow-50 p-4 mb-6"
      role="alert"
      aria-labelledby="draft-alert-title"
    >
      <div className="flex">
        <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        <div className="ml-3 flex-1">
          <h4 id="draft-alert-title" className="text-sm text-yellow-700">
            You have an unfinished application draft. Would you like to resume
            where you left off?
          </h4>
          <div className="mt-4 flex space-x-4">
            <button
              type="button"
              onClick={onResume}
              className="text-sm font-medium text-yellow-700 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              Resume Draft
            </button>
            <button
              type="button"
              onClick={onDiscard}
              className="text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Start Fresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
