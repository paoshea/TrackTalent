import React, { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { LoadingSpinner } from '../shared/LoadingSpinner';

const PIPELINE_STAGES = {
  screening: 'Initial Screening',
  interview: 'Interview',
  technical: 'Technical Assessment',
  offer: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected'
};

export default function CandidatePipeline() {
  const [selectedStage, setSelectedStage] = useState('all');
  const { applications, loading } = useApplications();

  if (loading) {
    return <LoadingSpinner />;
  }

  const groupedCandidates = applications.reduce((acc, application) => {
    const stage = application.status;
    if (!acc[stage]) acc[stage] = [];
    acc[stage].push(application);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Candidate Pipeline</h2>
        <select
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">All Stages</option>
          {Object.entries(PIPELINE_STAGES).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedCandidates)
          .filter(([stage]) => selectedStage === 'all' || stage === selectedStage)
          .map(([stage, candidates]) => (
            <div key={stage} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {PIPELINE_STAGES[stage]}
                </h3>
                <span className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                  {candidates.length}
                </span>
              </div>
              <div className="space-y-4">
                {candidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {candidate.user.full_name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {candidate.job.title}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">
                        {new Date(candidate.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}