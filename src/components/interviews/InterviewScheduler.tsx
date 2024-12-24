import { useState } from "react";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { TimeSlotPicker } from "./TimeSlotPicker";

interface Interviewer {
  id: string;
  name: string;
  avatar?: string;
  availability: {
    date: string;
    slots: string[];
  }[];
}

interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface InterviewSchedulerProps {
  interviewers: Interviewer[];
  candidate: Candidate;
  jobTitle: string;
  onSchedule: (data: {
    date: string;
    time: string;
    interviewerId: string;
  }) => Promise<void>;
  className?: string;
}

export function InterviewScheduler({
  interviewers,
  candidate,
  jobTitle,
  onSchedule,
  className = "",
}: InterviewSchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState<string | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !selectedInterviewer) return;

    try {
      setIsSubmitting(true);
      await onSchedule({
        date: selectedDate,
        time: selectedTime,
        interviewerId: selectedInterviewer,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableInterviewers = selectedDate
    ? interviewers.filter((interviewer) =>
        interviewer.availability.some(
          (a) => a.date === selectedDate && a.slots.length > 0,
        ),
      )
    : [];

  const availableSlots =
    selectedInterviewer && selectedDate
      ? (
          interviewers
            .find((i) => i.id === selectedInterviewer)
            ?.availability.find((a) => a.date === selectedDate)?.slots || []
        ).map((slot) => ({
          id: slot,
          startTime: slot,
          endTime: format(
            new Date(
              new Date(`${selectedDate}T${slot}`).getTime() + 60 * 60 * 1000,
            ),
            "HH:mm",
          ),
          isAvailable: true,
        }))
      : [];

  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">
          Schedule Interview
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Schedule an interview with {candidate.name} for {jobTitle}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <span>Select Date</span>
              </div>
            </label>
            <div className="mt-1">
              <input
                type="date"
                min={format(new Date(), "yyyy-MM-dd")}
                value={selectedDate || ""}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setSelectedTime(null);
                  setSelectedInterviewer(null);
                }}
                className="
                  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full
                  sm:text-sm border-gray-300 rounded-md
                "
              />
            </div>
          </div>

          {/* Interviewer Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span>Select Interviewer</span>
              </div>
            </label>
            <div className="mt-1">
              <select
                value={selectedInterviewer || ""}
                onChange={(e) => {
                  setSelectedInterviewer(e.target.value);
                  setSelectedTime(null);
                }}
                disabled={!selectedDate || availableInterviewers.length === 0}
                className="
                  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full
                  sm:text-sm border-gray-300 rounded-md
                "
              >
                <option value="">Select an interviewer</option>
                {availableInterviewers.map((interviewer) => (
                  <option key={interviewer.id} value={interviewer.id}>
                    {interviewer.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span>Select Time</span>
              </div>
            </label>
            <div className="mt-1">
              <TimeSlotPicker
                slots={availableSlots}
                selectedSlot={selectedTime}
                onSelect={setSelectedTime}
                disabled={!selectedDate || !selectedInterviewer}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              !selectedDate ||
              !selectedTime ||
              !selectedInterviewer ||
              isSubmitting
            }
            className="
              inline-flex items-center px-4 py-2 border border-transparent
              text-sm font-medium rounded-md shadow-sm text-white
              bg-indigo-600 hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isSubmitting ? "Scheduling..." : "Schedule Interview"}
          </button>
        </div>
      </div>
    </div>
  );
}
