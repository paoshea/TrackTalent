import React, { useRef } from 'react';
import { MobileNavigation } from './Navigation';
import { useSwipe } from '../../hooks/useSwipe';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Use swipe hook to handle touch gestures
  useSwipe(menuRef, {
    onSwipeLeft: () => {
      if (isOpen) onClose();
    }
  });

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity"
      onClick={handleBackdropClick}
    >
      <div ref={menuRef} className="h-full">
        <MobileNavigation isOpen={isOpen} onClose={onClose} />
      </div>
    </div>
  );
};

// Menu Button Component
interface MenuButtonProps {
  onClick: () => void;
  className?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      aria-label="Open menu"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  );
};
