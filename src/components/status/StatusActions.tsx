import { Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface StatusActionsProps {
  onDelete: () => Promise<void>;
  onClose: () => void;
}

export function StatusActions({ onDelete, onClose }: StatusActionsProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="status-actions-button"
    >
      <div className="py-1" role="none">
        <button
          type="button"
          onClick={async () => {
            await onDelete();
            onClose();
          }}
          className="
            w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50
            flex items-center space-x-2
          "
          role="menuitem"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
