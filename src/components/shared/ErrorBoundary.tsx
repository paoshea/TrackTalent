// import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { Home } from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError() as { status?: number; statusText?: string; message?: string };
  const status = error?.status || 500;
  const message = error?.statusText || error?.message || 'Something went wrong';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">{status}</h1>
        <p className="text-xl text-gray-600 mb-8">{message}</p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
