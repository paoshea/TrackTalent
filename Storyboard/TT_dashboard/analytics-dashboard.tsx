import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const AnalyticsDashboard = () => {
  // Sample data - would be replaced with real API data
  const productivityData = [
    { date: '2024-01', target: 100, actual: 95, efficiency: 0.95 },
    { date: '2024-02', target: 100, actual: 98, efficiency: 0.98 },
    { date: '2024-03', target: 100, actual: 92, efficiency: 0.92 },
    { date: '2024-04', target: 100, actual: 103, efficiency: 1.03 },
    { date: '2024-05', target: 100, actual: 97, efficiency: 0.97 },
    { date: '2024-06', target: 100, actual: 99, efficiency: 0.99 }
  ];

  const attendanceData = [
    { status: 'Present', value: 85 },
    { status: 'Absent', value: 8 },
    { status: 'Late', value: 5 },
    { status: 'Leave', value: 2 }
  ];

  const trainingData = [
    { month: 'Jan', completed: 45, ongoing: 30, planned: 25 },
    { month: 'Feb', completed: 50, ongoing: 28, planned: 22 },
    { month: 'Mar', completed: 55, ongoing: 25, planned: 20 },
    { month: 'Apr', completed: 60, ongoing: 22, planned: 18 },
    { month: 'May', completed: 65, ongoing: 20, planned: 15 },
    { month: 'Jun', completed: 70, ongoing: 18, planned: 12 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Productivity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Output" />
                <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trainingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" stackId="a" fill="#8884d8" />
                  <Bar dataKey="ongoing" stackId="a" fill="#82ca9d" />
                  <Bar dataKey="planned" stackId="a" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;