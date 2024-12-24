import React, { useState } from 'react';
import { useApplications } from '../../hooks/useApplications';
import { CandidateCard } from './CandidateCard';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PIPELINE_STAGES = [
  { id: 'screening', label: 'Screening' },
  { id: 'interview', label: 'Interview' },
  { id: 'offer', label: 'Offer' },
  { id: 'hired', label: 'Hired' }
];

export function CandidatePipeline() {
  const { applications, updateApplicationStatus } = useApplications();
  const [selectedJob, setSelectedJob] = useState<string | 'all'>('all');

  const pipelineData = PIPELINE_STAGES.map(stage => ({
    ...stage,
    candidates: applications.filter(app => 
      app.status === stage.id && 
      (selectedJob === 'all' || app.jobId === selectedJob)
    )
  }));

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus = PIPELINE_STAGES[destination.droppableId].id;
    updateApplicationStatus(draggableId, newStatus);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Candidate Pipeline</h1>

      <div className="flex gap-4 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          {pipelineData.map((stage, index) => (
            <Droppable key={stage.id} droppableId={index.toString()}>
              {(provided) => (
                <div 
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {stage.label} ({stage.candidates.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {stage.candidates.map((candidate, index) => (
                      <Draggable
                        key={candidate.id}
                        draggableId={candidate.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <CandidateCard candidate={candidate} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}