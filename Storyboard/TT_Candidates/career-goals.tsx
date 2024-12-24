import React from 'react';
import { Target, CheckCircle } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  progress: number;
  dueDate: string;
  completed: boolean;
}

export function CareerGoals() {
  const [goals, setGoals] = React.useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Advanced React Course',
      progress: 75,
      dueDate: '2024-12-31',
      completed: false
    },
    {
      id: '2',
      title: 'Build 3 Portfolio Projects',
      progress: 33,
      dueDate: '2024-12-31',
      completed: false
    }
  ]);

  const toggleGoal = (goalId: string) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed: !goal.completed }
        : goal
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Career Goals</h2>
        <Target className="h-5 w-5 text-indigo-600" />
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div 
            key={goal.id}
            className={`p-4 rounded-lg border ${
              goal.completed 
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 hover:border-indigo-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{goal.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Due {new Date(goal.dueDate).toLocaleDateString()}
                </p>
                {!goal.completed && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <span className="mt-1 text-xs text-gray-500">
                      {goal.progress}% complete
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={() => toggleGoal(goal.id)}
                className={`ml-4 p-2 rounded-full ${
                  goal.completed
                    ? 'text-green-600 hover:text-green-700'
                    : 'text-gray-400 hover:text-gray-500'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Add New Goal
      </button>
    </div>
  );
}