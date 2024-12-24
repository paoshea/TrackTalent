// import React from "react";
import { AlertCircle } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  isOpen,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        role="document"
      >
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-indigo-600 mr-2" />
          <h3 id="dialog-title" className="text-lg font-medium text-gray-900">
            Confirm Submission
          </h3>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to submit your application? This action cannot
          be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            autoFocus
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
