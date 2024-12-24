import React, { useState } from 'react';
import { Users, Target, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const RiskLevels = {
  HIGH: { color: '#ef4444', label: 'High Risk' },
  MEDIUM: { color: '#f59e0b', label: 'Medium Risk' },
  LOW: { color: '#22c55e', label: 'Low Risk' }
};

interface Role {
  id: string;
  title: string;
  department: string;
  riskLevel: keyof typeof RiskLevels;
  successorCount: number;
  readinessScore: number;
  timeToReady: number;
}

const KeyRoleCard = ({ role }: { role: Role }) => {
  const riskInfo = RiskLevels[role.riskLevel];
  
  return (
    <div className="bg-white rounded-lg shadow p-4 border-l-4" style={{ borderLeftColor: riskInfo.color }}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{role.title}</h3>
          <p className="text-sm text-gray-600">{role.department}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${riskInfo.color}20`, color: riskInfo.color }}>
          {riskInfo.label}
        </span>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500">Successors</p>
          <p className="text-lg font-semibold text-gray-900">{role.successorCount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Readiness</p>
          <p className="text-lg font-semibold text-gray-900">{role.readinessScore}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Time to Ready</p>
          <p className="text-lg font-semibold text-gray-900">{role.timeToReady}mo</p>
        </div>
      </div>
    </div>
  );
};

const SuccessionDashboard = () => {
  const [keyRoles] = useState<Role[]>([
    {
      id: '1',
      title: 'Engineering Director',
      department: 'Engineering',
      riskLevel: 'HIGH',
      successorCount: 2,
      readinessScore: 65,
      timeToReady: 12
    },
    {
      id: '2',
      title: 'Head of Product',
      department: 'Product',
      riskLevel: 'MEDIUM',
      successorCount: 3,
      readinessScore: 78,
      timeToReady: 6
    },
    {
      id: '3',
      title: 'Senior Architect',
      department: 'Engineering',
      riskLevel: 'LOW',
      successorCount: 4,
      readinessScore: 85,
      timeToReady: 3
    }
  ]);

  const demographicData = [
    { age: '25-34', count: 45 },
    { age: '35-44', count: 30 },
    { age: '45-54', count: 15 },
    { age: '55+', count: 10 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Key Roles at Risk</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Succession Coverage</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Readiness Score</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Development Plans</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Key Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {keyRoles.map(role => (
                  <KeyRoleCard key={role.id} role={role} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Age Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={demographicData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count">
                      {demographicData.map((entry, index) => (
                        <Cell key={index} fill={`hsl(${index * 50}, 70%, 50%)`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SuccessionDashboard;