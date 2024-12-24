import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChartBar, Users, BookOpen, Clock, AlertCircle } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';

const HRAnalyticsPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const performanceData = [
    { date: '2024-01', productivity: 95, attendance: 98, training: 85 },
    { date: '2024-02', productivity: 97, attendance: 96, training: 88 },
    { date: '2024-03', productivity: 94, attendance: 97, training: 90 },
    { date: '2024-04', productivity: 98, attendance: 99, training: 92 },
    { date: '2024-05', productivity: 96, attendance: 95, training: 94 }
  ];

  const QuickStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">Total Employees</p>
              <h3 className="text-2xl font-bold">1,245</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <ChartBar className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600">Avg Productivity</p>
              <h3 className="text-2xl font-bold">94.8%</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-purple-50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600">Training Completion</p>
              <h3 className="text-2xl font-bold">89.2%</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">HR Analytics Platform</h1>
        <div className="flex items-center space-x-4">
          <Clock className="h-5 w-5" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard" className="flex items-center">
            <ChartBar className="h-4 w-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="productivity" className="flex items-center">
            <ChartBar className="h-4 w-4 mr-2" />
            Productivity
          </TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Training
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <QuickStats />
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="productivity" 
                      stroke="#8884d8" 
                      name="Productivity"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="attendance" 
                      stroke="#82ca9d" 
                      name="Attendance"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="training" 
                      stroke="#ffc658" 
                      name="Training"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <div>
                        <p className="font-medium">Productivity Below Target</p>
                        <p className="text-sm text-gray-500">Department A - 2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 text-left bg-blue-50 rounded-lg hover:bg-blue-100">
                    <Users className="h-6 w-6 mb-2" />
                    <p className="font-medium">View Reports</p>
                  </button>
                  <button className="p-4 text-left bg-green-50 rounded-lg hover:bg-green-100">
                    <ChartBar className="h-6 w-6 mb-2" />
                    <p className="font-medium">Export Data</p>
                  </button>
                  <button className="p-4 text-left bg-purple-50 rounded-lg hover:bg-purple-100">
                    <BookOpen className="h-6 w-6 mb-2" />
                    <p className="font-medium">Training Status</p>
                  </button>
                  <button className="p-4 text-left bg-orange-50 rounded-lg hover:bg-orange-100">
                    <AlertCircle className="h-6 w-6 mb-2" />
                    <p className="font-medium">Manage Alerts</p>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productivity">
          {/* Productivity specific content */}
        </TabsContent>

        <TabsContent value="attendance">
          {/* Attendance specific content */}
        </TabsContent>

        <TabsContent value="training">
          {/* Training specific content */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HRAnalyticsPlatform;