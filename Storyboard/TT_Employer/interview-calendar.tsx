import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { useInterviews } from '../../hooks/useInterviews';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export default function InterviewCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { interviews, loading } = useInterviews();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  const getDayInterviews = (date: Date) => {
    return interviews.filter(interview => 
      new Date(interview.scheduled_at).toDateString() === date.toDateString()
    );
  };

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      slots.push(new Date(selectedDate).setHours(hour, 0, 0, 0));
    }
    return slots;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Interview Schedule</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Calendar className="h-5 w-5 mr-2" />
          Schedule Interview
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-white rounded-lg shadow p-4">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming</h3>
            <div className="space-y-4">
              {interviews.slice(0, 5).map((interview) => (
                <div key={interview.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-900">
                      {new Date(interview.scheduled_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {interview.candidate.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {interview.position}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
          <div className="grid grid-cols-1 gap-4">
            {generateTimeSlots().map((timeSlot) => {
              const slotInterviews = getDayInterviews(new Date(timeSlot));
              return (
                <div
                  key={timeSlot}
                  className="flex items-start gap-4 p-4 border-b border-gray-200 last:border-0"
                >
                  <div className="w-20 text-sm text-gray-500">
                    {new Date(timeSlot).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="flex-1">
                    {slotInterviews.map((interview) => (
                      <div
                        key={interview.id}
                        className="p-3 bg-indigo-50 text-indigo-700 rounded-lg mb-2"
                      >
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {interview.candidate.name}
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          {interview.position}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}