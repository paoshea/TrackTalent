import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const EnhancedDashboard = () => {
  const performanceData = [
    { hour: '08:00', output: 95, quality: 98, efficiency: 92, target: 100 },
    { hour: '09:00', output: 97, quality: 96, efficiency: 94, target: 100 },
    { hour: '10:00', output: 94, quality: 97, efficiency: 91, target: 100 },
    { hour: '11:00', output: 98, quality: 99, efficiency: 95, target: 100 },
    { hour: '12:00', output: 92, quality: 95, efficiency: 90, target: 100 }
  ];

  const skillMetrics = [
    { subject: 'Technical', A: 90, B: 85, fullMark: 100 },
    { subject: 'Quality', A: 95, B: 88, fullMark: 100 },
    { subject: 'Safety', A: 92, B: 90, fullMark: 100 },
    { subject: 'Efficiency', A: 85, B: 82, fullMark: 100 },
    { subject: 'Teamwork', A: 88, B: 85, fullMark: 100 }
  ];

  const productivityData = [
    { department: 'A', productivity: 85, cost: 75, value: 2400 },
    { department: 'B', productivity: 92, cost: 82, value: 2800 },
    { department: 'C', productivity: 78, cost: 71, value: 2200 },
    { department: 'D', productivity: 95, cost: 88, value: 3000 },
    { department: 'E', productivity: 89, cost: 80, value: 2600 }
  ];

  return (
    <div className="space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Hourly Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="output" fill="#8884d8" />
                <Line type="monotone" dataKey="target" stroke="#ff7300" />
                <Line type="monotone" dataKey="quality" stroke="#82ca9d" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Skill Matrix Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Team A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Radar name="Team B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Productivity vs Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="productivity" name="Productivity" unit="%" />
                  <YAxis dataKey="cost" name="Cost" unit="%" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Departments" data={productivityData} fill="#8884d8">
                    {productivityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedDashboard;