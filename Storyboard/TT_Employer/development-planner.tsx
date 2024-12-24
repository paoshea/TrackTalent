import React, { useState } from 'react';
import { BookOpen, Target, Calendar, CheckCircle, PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DevelopmentActivity {
  id: string;
  type: 'training' | 'mentoring' | 'project' | 'certification';
  title: string;
  description: string;
  targetSkills: string[];
  startDate: string;
  endDate: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
}

interface DevelopmentPlan {
  id: string;
  successorId: string;
  successorName: string;
  targetRole: string;
  activities: DevelopmentActivity[];
  overallProgress: number;
  startDate: string;
  targetCompletionDate: string;
}

const ActivityTypeIcons = {
  training: BookOpen,
  mentoring: Target,
  project: Calendar,
  certification: CheckCircle
};

const ActivityCard = ({ 
  activity,
  onEdit,
  onDelete 
}: { 
  activity: DevelopmentActivity;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const Icon = ActivityTypeIcons[activity.type];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(activity.id)}
            className="text-gray-400 hover:text-gray-500"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(activity.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-900">{activity.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-indigo-600"
            style={{ width: `${activity.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {activity.targetSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Start: {new Date(activity.startDate).toLocaleDateString()}</span>
        <span>End: {new Date(activity.endDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const DevelopmentPlanner = () => {
  const [plans, setPlans] = useState<DevelopmentPlan[]>([
    {
      id: '1',
      successorId: '1',
      successorName: 'Sarah Johnson',
      targetRole: 'Engineering Director',
      activities: [
        {
          id: '1',
          type: 'training',
          title: 'Executive Leadership Program',
          description: 'Comprehensive leadership training focused on strategic planning and organizational management',
          targetSkills: ['Strategic Planning', 'Leadership', 'Change Management'],
          startDate: '2024-05-01',
          endDate: '2024-07-31',
          status: 'in_progress',
          progress: 35
        },
        {
          id: '2',
          type: 'mentoring',
          title: 'Executive Shadowing',
          description: 'One-on-one mentoring sessions with current Engineering Director',
          targetSkills: ['Leadership', 'Decision Making'],
          startDate: '2024-06-01',
          endDate: '2024-12-31',
          status: 'not_started',
          progress: 0
        }
      ],
      overallProgress: 25,
      startDate: '2024-05-01',
      targetCompletionDate: '2024-12-31'
    }
  ]);

  const handleAddActivity = (planId: string) => {
    // Implementation for adding new activity
  };

  const handleEditActivity = (planId: string, activityId: string) => {
    // Implementation for editing activity
  };

  const handleDeleteActivity = (planId: string, activityId: string) => {
    // Implementation for deleting activity
  };

  return (
    <div className="space-y-6">
      {plans.map((plan) => (
        <div key={plan.id} className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Development Plan for {plan.successorName}
                </h3>
                <p className="text-sm text-gray-600">Target Role: {plan.targetRole}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Overall Progress</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {plan.overallProgress}%
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <button
                onClick={() => handleAddActivity(plan.id)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Activity
              </button>
            </div>

            <div className="space-y-4">
              {plan.activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onEdit={(id) => handleEditActivity(plan.id, id)}
                  onDelete={(id) => handleDeleteActivity(plan.id, id)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DevelopmentPlanner;