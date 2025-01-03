/**
 * Helper functions for common operations across the application
 */

import { Job } from '../types/jobs';
import { Application, ApplicationStatus } from '../types/applications';
import { formatDate, getRelativeTimeString } from './dateUtils';

export { formatDate, getRelativeTimeString };

/**
 * Format a currency value
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Filter jobs by status
 */
export const filterJobsByStatus = (jobs: Job[], status: Array<'draft' | 'published' | 'closed'>): Job[] => {
  return jobs.filter(job => status.includes(job.status));
};

/**
 * Filter applications by status
 */
export const filterApplicationsByStatus = (
  applications: Application[],
  status: ApplicationStatus[]
): Application[] => {
  return applications.filter(app => status.includes(app.status));
};

/**
 * Sort items by date
 */
export const sortByDate = <T extends { createdAt: string | Date }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

/**
 * Truncate text to a specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

/**
 * Calculate percentage change
 */
export const calculatePercentageChange = (
  current: number,
  previous: number
): number => {
  if (previous === 0) return 0;
  return Math.round(((current - previous) / previous) * 100);
};

/**
 * Format large numbers with K/M/B suffixes
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};
