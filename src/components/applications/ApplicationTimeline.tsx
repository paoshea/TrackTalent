import React from "react";
import { CalendarClock } from "lucide-react";
import type { ApplicationEvent } from "../../types/applications";

interface Props {
  events: ApplicationEvent[];
}

export function ApplicationTimeline({ events }: Props) {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {events.map((event, idx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {idx !== events.length - 1 && (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" />
              )}
              <div className="relative flex space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                  <CalendarClock className="h-5 w-5 text-gray-500" />
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">{event.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
