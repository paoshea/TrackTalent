import { Trash2 } from "lucide-react";
import type { Experience } from "../../../types/candidate";

interface ExperienceCardProps {
  index: number;
  experience: Experience;
  onUpdate: (updates: Partial<Experience>) => void;
  onDelete: () => void;
  canDelete: boolean;
  isFirst: boolean;
}

export function ExperienceCard({
  index,
  experience,
  onUpdate,
  onDelete,
  canDelete,
  isFirst,
}: ExperienceCardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium text-gray-900">
          {isFirst
            ? "Current/Most Recent Position"
            : `Previous Position ${index}`}
        </h3>
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor={`company-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <div className="mt-1">
            <input
              type="text"
              name={`company-${index}`}
              id={`company-${index}`}
              value={experience.company}
              onChange={(e) => onUpdate({ company: e.target.value })}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor={`position-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Position
          </label>
          <div className="mt-1">
            <input
              type="text"
              name={`position-${index}`}
              id={`position-${index}`}
              value={experience.position}
              onChange={(e) => onUpdate({ position: e.target.value })}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor={`startDate-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <div className="mt-1">
            <input
              type="date"
              name={`startDate-${index}`}
              id={`startDate-${index}`}
              value={experience.startDate}
              onChange={(e) => onUpdate({ startDate: e.target.value })}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor={`endDate-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <div className="mt-1">
            <input
              type="date"
              name={`endDate-${index}`}
              id={`endDate-${index}`}
              value={experience.endDate || ""}
              onChange={(e) => onUpdate({ endDate: e.target.value })}
              disabled={experience.current}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="sm:col-span-6">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id={`current-${index}`}
                name={`current-${index}`}
                type="checkbox"
                checked={experience.current}
                onChange={(e) => onUpdate({ current: e.target.checked })}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor={`current-${index}`}
                className="font-medium text-gray-700"
              >
                I currently work here
              </label>
            </div>
          </div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor={`description-${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-1">
            <textarea
              id={`description-${index}`}
              name={`description-${index}`}
              rows={4}
              value={experience.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
