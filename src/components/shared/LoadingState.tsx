// import React from 'react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading..." }: LoadingStateProps) => (
  <div className="flex items-center justify-center">
    <div className="text-lg text-gray-600">{message}</div>
  </div>
);
