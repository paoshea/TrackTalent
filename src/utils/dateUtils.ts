import {
  formatDistanceToNow as fnsFormatDistanceToNow,
  formatDistance,
  parseISO,
  format,
  isValid,
} from "date-fns";

export { fnsFormatDistanceToNow as formatDistanceToNow };

export function formatTimeAgo(date: string | Date): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "Invalid date";
  return fnsFormatDistanceToNow(parsedDate, { addSuffix: true });
}

export function formatDateRange(start: Date, end: Date): string {
  return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`;
}

export function formatDuration(start: Date, end: Date): string {
  return formatDistance(start, end);
}

export function formatDateTime(date: string | Date): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "Invalid date";
  return format(parsedDate, "MMM d, yyyy 'at' h:mm a");
}

export function formatDate(date: string | Date): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "Invalid date";
  return format(parsedDate, "MMM d, yyyy");
}

export function formatTime(date: string | Date): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "Invalid date";
  return format(parsedDate, "h:mm a");
}

export function getRelativeTimeString(date: string | Date): string {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  if (!isValid(parsedDate)) return "Invalid date";
  
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - parsedDate.getTime()) / 36e5;

  if (diffInHours < 24) {
    return fnsFormatDistanceToNow(parsedDate, { addSuffix: true });
  } else if (diffInHours < 48) {
    return format(parsedDate, "'Yesterday at' h:mm a");
  } else {
    return format(parsedDate, "MMM d 'at' h:mm a");
  }
}
