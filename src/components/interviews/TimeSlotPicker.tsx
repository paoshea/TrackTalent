import { format, parse } from "date-fns";

export interface InterviewSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface TimeSlotPickerProps {
  slots: InterviewSlot[];
  selectedSlot: string | null;
  onSelect: (slot: string) => void;
  disabled?: boolean;
  className?: string;
}

export function TimeSlotPicker({
  slots,
  selectedSlot,
  onSelect,
  disabled = false,
  className = "",
}: TimeSlotPickerProps) {
  const formatTimeSlot = (time: string) => {
    try {
      return format(parse(time, "HH:mm", new Date()), "h:mm a");
    } catch {
      return time;
    }
  };

  if (slots.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No time slots available for the selected date and interviewer.
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 ${className}`}
    >
      {slots.map((slot) => (
        <button
          key={slot.id}
          type="button"
          onClick={() => onSelect(slot.startTime)}
          disabled={disabled || !slot.isAvailable}
          className={`
            px-3 py-2 text-sm font-medium rounded-md
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${
              selectedSlot === slot.startTime
                ? "bg-indigo-600 text-white"
                : slot.isAvailable
                  ? "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {formatTimeSlot(slot.startTime)}
        </button>
      ))}
    </div>
  );
}
