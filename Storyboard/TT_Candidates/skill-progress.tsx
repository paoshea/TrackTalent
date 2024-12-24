import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useSkillProgress } from '../../hooks/useSkillProgress';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export function SkillProgress() {
  const { skillProgress, isLoading } = useSkillProgress();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Skill Development</h2>
        <TrendingUp className="h-5 w-5 text-indigo-600" />
      </div>

      <div className="space-y-4">
        {skillProgress.map((skill) => (
          <div key={skill.name} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
              <span className="text-sm text-gray-500">Level {skill.level}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(skill.level / 5) * 100}%` }}
              />
            </div>
            {skill.improvement && (
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>+{skill.improvement}% improvement</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        onClick={() => window.location.href = '/skills-assessment'}
      >
        Take Skill Assessment
      </button>
    </div>
  );
}