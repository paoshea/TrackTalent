import React, { useState } from 'react';
import { Award, BookOpen, TrendingUp, Clock } from 'lucide-react';

interface Skill {
  name: string;
  currentLevel: number;
  requiredLevel: number;
}

interface Successor {
  id: string;
  name: string;
  currentRole: string;
  yearsOfService: number;
  readinessScore: number;
  timeToReady: number;
  skills: Skill[];
  developmentActivities: {
    completed: number;
    total: number;
    nextActivity: string;
    nextDueDate: string;
  };
}

const SkillGapIndicator = ({ current, required }: { current: number; required: number }) => {
  const percentage = (current / required) * 100;
  const getColor = () => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${getColor()}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const SuccessorDetails = ({ successor }: { successor: Successor }) => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{successor.name}</h3>
            <p className="text-sm text-gray-600">{successor.currentRole}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Award className="h-5 w-5 text-blue-500" />
            <span className="text-lg font-semibold text-blue-500">
              {successor.readinessScore}%
            </span>
          </div>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-500">Years of Service</div>
            <div className="text-lg font-semibold">{successor.yearsOfService} years</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Time to Ready</div>
            <div className="text-lg font-semibold">{successor.timeToReady} months</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Skills Assessment</h4>
            <div className="space-y-4">
              {successor.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{skill.name}</span>
                    <span className="text-gray-900 font-medium">
                      {skill.currentLevel}/{skill.requiredLevel}
                    </span>
                  </div>
                  <SkillGapIndicator
                    current={skill.currentLevel}
                    required={skill.requiredLevel}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-4">Development Progress</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-indigo-500 mr-2" />
                  <span className="text-sm font-medium">
                    {successor.developmentActivities.completed} of {successor.developmentActivities.total} Activities Completed
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {Math.round((successor.developmentActivities.completed / successor.developmentActivities.total) * 100)}%
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Next Activity:</div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {successor.developmentActivities.nextActivity}
                  </span>
                  <span className="text-sm text-gray-500">
                    Due: {successor.developmentActivities.nextDueDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessorList = () => {
  const [successors] = useState<Successor[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      currentRole: 'Senior Engineering Manager',
      yearsOfService: 5,
      readinessScore: 85,
      timeToReady: 6,
      skills: [
        { name: 'Technical Leadership', currentLevel: 4, requiredLevel: 5 },
        { name: 'Strategic Planning', currentLevel: 3, requiredLevel: 4 },
        { name: 'People Management', currentLevel: 4, requiredLevel: 5 }
      ],
      developmentActivities: {
        completed: 8,
        total: 10,
        nextActivity: 'Executive Leadership Workshop',
        nextDueDate: '2024-06-15'
      }
    },
    {
      id: '2',
      name: 'Michael Chen',
      currentRole: 'Lead Software Architect',
      yearsOfService: 4,
      readinessScore: 78,
      timeToReady: 9,
      skills: [
        { name: 'System Architecture', currentLevel: 5, requiredLevel: 5 },
        { name: 'Team Leadership', currentLevel: 3, requiredLevel: 5 },
        { name: 'Strategic Planning', currentLevel: 3, requiredLevel: 4 }
      ],
      developmentActivities: {
        completed: 6,
        total: 12,
        nextActivity: 'Leadership Fundamentals Course',
        nextDueDate: '2024-05-30'
      }
    }
  ]);

  return (
    <div className="space-y-6">
      {successors.map(successor => (
        <SuccessorDetails key={successor.id} successor={successor} />
      ))}
    </div>
  );
};

export default SuccessorList;