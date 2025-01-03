import { format, formatDistance, formatRelative, parseISO } from 'date-fns';

interface DateFormatterOptions {
  format?: string;
  defaultValue?: string;
}

export function formatDate(date: string | Date | undefined, options: DateFormatterOptions = {}) {
  const formatStr = options.format || 'MMM d, yyyy';
  const defaultValue = options.defaultValue || 'N/A';

  if (!date) {
    return defaultValue;
  }

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return defaultValue;
  }
}

export function formatRelativeTime(date: string | Date | undefined, defaultValue = 'N/A') {
  if (!date) {
    return defaultValue;
  }

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return defaultValue;
  }
}

export function formatDateRange(startDate: Date, endDate: Date | undefined, options: DateFormatterOptions = {}) {
  const formatStr = options.format || 'MMM d, yyyy';
  const defaultValue = options.defaultValue || 'Present';

  const start = format(startDate, formatStr);
  const end = endDate ? format(endDate, formatStr) : defaultValue;

  return `${start} - ${end}`;
}

export function getRelativeDate(date: string | Date | undefined, defaultValue = 'N/A') {
  if (!date) {
    return defaultValue;
  }

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatRelative(dateObj, new Date());
  } catch (error) {
    console.error('Error getting relative date:', error);
    return defaultValue;
  }
}

export function isValidDate(date: string | Date | number | null | undefined): boolean {
  if (!date) {
    return false;
  }

  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : 
                    typeof date === 'number' ? new Date(date) : date;
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  } catch {
    return false;
  }
}
