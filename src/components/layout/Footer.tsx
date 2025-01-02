//import React from 'react';
import { Logo } from '../branding/Logo';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo className="h-16 w-auto" />
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} TrackTalent. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
