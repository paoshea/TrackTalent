import React, { useState } from 'react';
import { Star, Clock, FileText, MessageSquare } from 'lucide-react';
import { useApplication } from '../../hooks/useApplication';
import { InterviewScheduler } from './InterviewScheduler';
import { EvaluationForm } from './EvaluationForm';

export function CandidateEvaluation({ applicationId }: { applicationId: string }) {
  const [activeTab, setActiveTab] = useState('profile');
  const { application, updateEvaluation } = useApplication(applicationId);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FileText },
    { id: 'interview', label: 'Interview', icon: Clock },
    { id: 'evaluation', label: 'Evaluation', icon: Star },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center px-6 py-4 border-b-2 text-sm font-medium
                ${activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="flex items-start space-x-6">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {application?.candidate.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {application?.candidate.email}
                </p>
              </div>
              <a
                href={application?.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                View Resume
              </a>
            </div>

            {/* Skills Match */}
            <div>
              <h4 className="text-sm font-medium text-gray-900">Skills Match</h4>
              <div className="mt-2 space-y-2">
                {application?.skills_evaluation.map(skill => (
                  <div key={skill.name} className="flex items-center">
                    <span className="flex-1 text-sm text-gray-500">
                      {skill.name}
                    </span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500"
                        style={{ width: `${skill.match_percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'interview' && (
          <InterviewScheduler applicationId={applicationId} />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationForm
            initialData={application?.evaluation}
            onSubmit={updateEvaluation}
          />
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-4">
            {application?.feedback.map((feedback, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {feedback.evaluator}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {feedback.comments}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}