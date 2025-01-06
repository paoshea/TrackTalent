import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const GuestLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1">
        <Suspense 
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default GuestLayout;
