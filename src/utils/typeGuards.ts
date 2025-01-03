import type { TimelineEvent } from "../types/applications";

export function isTimelineEvent(event: unknown): event is TimelineEvent {
  const e = event as TimelineEvent;
  return (
    typeof e === 'object' &&
    e !== null &&
    typeof e.id === 'string' &&
    typeof e.type === 'string' &&
    typeof e.description === 'string' &&
    typeof e.timestamp === 'string'
  );
}
