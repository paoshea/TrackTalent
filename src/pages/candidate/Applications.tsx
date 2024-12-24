// import React from "react";
import { ApplicationList } from "../../components/applications/ApplicationList";

export function Applications() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">My Applications</h1>
      <ApplicationList />
    </div>
  );
}
