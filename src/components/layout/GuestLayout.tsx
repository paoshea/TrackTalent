// import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Logo } from "../branding/Logo";
import { Footer } from "./Footer";

export function GuestLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top header */}
      <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
        <div className="flex flex-1 justify-between px-4">
          <div className="flex items-center">
            <Link to="/">
              <Logo className="h-12 w-auto" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/auth/login"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Sign in
            </Link>
            <Link
              to="/auth/register"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
