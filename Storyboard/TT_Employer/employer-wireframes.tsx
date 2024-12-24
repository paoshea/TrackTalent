import React from 'react';
import { BarChart, Users, Clock, Building2, ChevronRight, Search, Filter, Briefcase } from 'lucide-react';

export const EmployerDashboard = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-2 text-gray-600">Track your hiring pipeline and manage job postings</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[
        { icon: Briefcase, label: 'Active Jobs', value: '12', change: '+2 this week' },
        { icon: Users, label: 'Total Candidates', value: '148', change: '+24 this week' },
        { icon: Clock, label: 'Time to Hire', value: '18 days', change: '-3 days from avg' },
        { icon: BarChart, label: 'Response Rate', value: '76%', change: '+5% this month' }
      ].map(stat => (
        <div key={stat.label} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-50">
              <stat.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Applications</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-500">View all</button>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Sarah Chen', role: 'Senior Frontend Developer', stage: 'Interview', time: '2 hours ago' },
              { name: 'Mike Johnson', role